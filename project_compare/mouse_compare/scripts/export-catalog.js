const { writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

async function main() {
  const mod = await import('../src/data/mice.ts');
  const outDir = join(__dirname, '..', 'backend', 'AspNetCoreAuth', 'AspNetCoreAuth', 'Data', 'SeedData');
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, 'catalog-seed.json');
  writeFileSync(outFile, JSON.stringify(mod.mice, null, 2));
  console.log('Wrote', outFile, 'with', mod.mice.length, 'mice');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
