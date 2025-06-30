#!/usr/bin/env node

/**
 * Deployment script for OptikCoinGPT platform
 * Handles environment setup and deployment to various providers
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DEPLOYMENT_PROVIDERS = {
  netlify: {
    name: 'Netlify',
    buildCommand: 'npm run build',
    publishDir: 'dist',
    envFile: '.env.production'
  },
  vercel: {
    name: 'Vercel',
    buildCommand: 'npm run build',
    publishDir: 'dist',
    envFile: '.env.production'
  }
};

function checkEnvironment() {
  console.log('🔍 Checking environment configuration...');
  
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY'
  ];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease set these in your .env file or deployment platform.');
    process.exit(1);
  }
  
  console.log('✅ Environment configuration looks good!');
}

function buildProject() {
  console.log('🏗️  Building project...');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function validateBuild() {
  console.log('🔍 Validating build output...');
  
  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build directory not found');
    process.exit(1);
  }
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found in build directory');
    process.exit(1);
  }
  
  console.log('✅ Build validation passed!');
}

function showDeploymentInstructions() {
  console.log('\n🚀 Deployment Instructions:');
  console.log('================================');
  
  console.log('\n📦 Your build is ready in the /dist folder');
  console.log('\n🌐 Deployment Options:');
  
  console.log('\n1. Netlify (Recommended):');
  console.log('   - Go to https://netlify.com');
  console.log('   - Drag and drop the /dist folder');
  console.log('   - Or connect your Git repository');
  console.log('   - Set build command: npm run build');
  console.log('   - Set publish directory: dist');
  
  console.log('\n2. Vercel:');
  console.log('   - Go to https://vercel.com');
  console.log('   - Import your Git repository');
  console.log('   - Framework preset: Vite');
  console.log('   - Build command: npm run build');
  console.log('   - Output directory: dist');
  
  console.log('\n3. Traditional Hosting:');
  console.log('   - Upload the contents of /dist to your web server');
  console.log('   - Configure server for SPA routing');
  console.log('   - Ensure HTTPS is enabled');
  
  console.log('\n⚠️  Don\'t forget to:');
  console.log('   - Set up your environment variables');
  console.log('   - Configure your custom domain');
  console.log('   - Test all functionality after deployment');
}

function main() {
  console.log('🚀 OptikCoinGPT Deployment Script');
  console.log('==================================\n');
  
  checkEnvironment();
  buildProject();
  validateBuild();
  showDeploymentInstructions();
  
  console.log('\n✨ Ready for deployment!');
}

if (require.main === module) {
  main();
}

module.exports = { checkEnvironment, buildProject, validateBuild };