async function scrapeShapeData() {
  try {
    const https = require('https');
    const cheerio = require('cheerio');

    const websites = [
      'https://www.razer.com/gaming-mice/viper-v3-pro',
      'https://www.logitechg.com/g-pro-x-superlight-2',
      'https://www.pulsarlights.com/en/mice/x2h',
    ];

    const results = [];

    for (const url of websites) {
      try {
        const html = await fetchUrl(url);
        const $ = cheerio.load(html);

        const shapeData = {
          name: '',
          dimensions: {
            length: 0,
            width: 0,
            height: 0,
          },
          shapeSvg: {
            top: '',
            side: '',
            back: '',
          },
          source: url,
        };

        shapeData.name = $('h1, h2, .product-title').first().text().trim();

        const lengthText = $('.spec-dimension, .length_mm, .dim-length').first().text().trim();
        const match = lengthText.match(/(\d+\.?\d*)\s*mm/i);
        if (match) shapeData.dimensions.length = parseFloat(match[1]);

        const widthText = $('.spec-dimension, .width_mm, .dim-width').first().text().trim();
        const widthMatch = widthText.match(/(\d+\.?\d*)\s*mm/i);
        if (widthMatch) shapeData.dimensions.width = parseFloat(widthMatch[1]);

        const heightText = $('.spec-dimension, .height_mm, .dim-height').first().text().trim();
        const heightMatch = heightText.match(/(\d+\.?\d*)\s*mm/i);
        if (heightMatch) shapeData.dimensions.height = parseFloat(heightMatch[1]);

        shapeData.shapeSvg.top = generateTopViewSvg(shapeData);
        shapeData.shapeSvg.side = generateSideViewSvg(shapeData);
        shapeData.shapeSvg.back = generateBackViewSvg(shapeData);

        results.push(shapeData);

        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error: unknown) {
        console.error(`Error scraping ${url}:`, error instanceof Error ? error.message : error);
      }
    }

    return results;
  } catch (error: unknown) {
    console.error('Scraping error:', error);
    return [];
  }
}

async function fetchUrl(url: string) {
  return new Promise<string>((resolve, reject) => {
    const https = require('https');
    const options = new URL(url);

    const req = https.request({
      hostname: options.hostname,
      path: options.pathname + options.search,
      method: 'GET',
      headers: {
        'User-Agent': 'GearForgeBot/1.0 (+https://gearforge.dev/bot)',
      },
    }, (res: import('http').IncomingMessage) => {
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error: Error) => {
      reject(error);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

function generateTopViewSvg(data: { dimensions: { length: number; width: number; height: number } }) {
  const { dimensions } = data;

  if (!dimensions.length || !dimensions.width) {
    return '';
  }

  const widthPx = dimensions.width / 2;
  const heightPx = dimensions.length / 2;

  return `M${widthPx} ${heightPx} L${widthPx - 10} ${heightPx - 20} L${widthPx - 30} ${heightPx - 40} L${widthPx} ${heightPx - 20} Z`;
}

function generateSideViewSvg(data: { dimensions: { length: number; width: number; height: number } }) {
  const { dimensions } = data;

  if (!dimensions.length || !dimensions.height) {
    return '';
  }

  const widthPx = dimensions.width / 2;
  const heightPx = dimensions.height / 2;

  return `M${widthPx} ${heightPx} L${widthPx + 15} ${heightPx - 20} L${widthPx + 35} ${heightPx - 10} L${widthPx + 20} ${heightPx + 20} Z`;
}

function generateBackViewSvg(data: { dimensions: { length: number; width: number; height: number } }) {
  const { dimensions } = data;

  if (!dimensions.width || !dimensions.height) {
    return '';
  }

  const widthPx = dimensions.width / 2;
  const heightPx = dimensions.height / 2;

  return `M${widthPx} ${heightPx} L${widthPx - 20} ${heightPx + 20} L${widthPx + 20} ${heightPx + 20} Z`;
}

function normalizeSvgPath(svgPath: string) {
  return svgPath
    .replace(/\s+/g, ' ')
    .trim();
}