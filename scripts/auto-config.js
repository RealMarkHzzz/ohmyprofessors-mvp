#!/usr/bin/env node
/**
 * OhMyProfessors - 自动配置工具
 * 通过 API 自动配置 Vercel 环境变量和 Supabase 设置
 */

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// 配置
const CONFIG = {
  vercel: {
    team: 'markhz',
    project: 'ohmyprofessors_web',
  },
  supabase: {
    projectId: 'bybpdituoktqmhpsssbo',
    url: 'https://bybpdituoktqmhpsssbo.supabase.co',
  }
};

// Vercel API 调用
async function vercelRequest(path, method = 'GET', data = null, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Supabase API 调用
async function supabaseRequest(path, method = 'GET', data = null, token, projectId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.supabase.com',
      path: `/v1/projects/${projectId}${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  console.log('\n🚀 OhMyProfessors 自动配置工具\n');
  console.log('需要以下凭证:\n');

  // 获取 Vercel Token
  console.log('📍 Step 1: Vercel 配置');
  console.log('访问: https://vercel.com/account/tokens');
  console.log('创建一个新的 Token (名称: OhMyProfessors Config)\n');
  const vercelToken = await question('粘贴 Vercel Token: ');
  
  // 获取 Supabase Token
  console.log('\n📍 Step 2: Supabase 配置');
  console.log('访问: https://supabase.com/dashboard/account/tokens');
  console.log('创建一个新的 Access Token\n');
  const supabaseToken = await question('粘贴 Supabase Access Token: ');
  
  // 获取 Supabase Keys
  console.log('\n📍 Step 3: Supabase Project Keys');
  console.log(`访问: https://supabase.com/dashboard/project/${CONFIG.supabase.projectId}/settings/api\n`);
  const supabaseAnonKey = await question('粘贴 anon public key: ');
  const supabaseServiceKey = await question('粘贴 service_role key: ');

  console.log('\n⚙️  开始自动配置...\n');

  try {
    // 1. 配置 Vercel 环境变量
    console.log('1️⃣  配置 Vercel 环境变量...');
    
    const envVars = [
      {
        key: 'NEXT_PUBLIC_SUPABASE_URL',
        value: CONFIG.supabase.url,
        target: ['production', 'preview', 'development']
      },
      {
        key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        value: supabaseAnonKey,
        target: ['production', 'preview', 'development']
      },
      {
        key: 'SUPABASE_SERVICE_ROLE_KEY',
        value: supabaseServiceKey,
        target: ['production']
      }
    ];

    // 获取项目 ID
    const projectsRes = await vercelRequest(
      `/v9/projects/${CONFIG.vercel.project}?teamId=${CONFIG.vercel.team}`,
      'GET',
      null,
      vercelToken
    );

    if (projectsRes.error) {
      throw new Error(`Vercel API Error: ${projectsRes.error.message}`);
    }

    const projectId = projectsRes.id;
    console.log(`   ✓ 项目 ID: ${projectId}`);

    // 添加环境变量
    for (const envVar of envVars) {
      const result = await vercelRequest(
        `/v10/projects/${projectId}/env?teamId=${CONFIG.vercel.team}`,
        'POST',
        envVar,
        vercelToken
      );
      
      if (result.error) {
        console.log(`   ⚠ ${envVar.key}: ${result.error.message}`);
      } else {
        console.log(`   ✓ ${envVar.key} 已添加`);
      }
    }

    // 2. 触发重新部署
    console.log('\n2️⃣  触发 Vercel 重新部署...');
    
    const deploymentsRes = await vercelRequest(
      `/v6/deployments?projectId=${projectId}&teamId=${CONFIG.vercel.team}&limit=1&target=production`,
      'GET',
      null,
      vercelToken
    );

    if (deploymentsRes.deployments && deploymentsRes.deployments.length > 0) {
      const latestDeployment = deploymentsRes.deployments[0];
      
      const redeployRes = await vercelRequest(
        `/v13/deployments`,
        'POST',
        {
          deploymentId: latestDeployment.uid,
          name: CONFIG.vercel.project,
          target: 'production'
        },
        vercelToken
      );

      if (redeployRes.error) {
        console.log(`   ⚠ Redeploy 失败: ${redeployRes.error.message}`);
      } else {
        console.log(`   ✓ Redeploy 已触发: ${redeployRes.url}`);
      }
    }

    // 3. 配置 Supabase Auth
    console.log('\n3️⃣  配置 Supabase Auth 设置...');
    
    const authConfig = {
      SITE_URL: 'https://ohmyprofessors.com',
      URI_ALLOW_LIST: 'https://ohmyprofessors.com/auth/callback,http://localhost:3000/auth/callback'
    };

    const authRes = await supabaseRequest(
      '/config/auth',
      'PATCH',
      authConfig,
      supabaseToken,
      CONFIG.supabase.projectId
    );

    if (authRes.error) {
      console.log(`   ⚠ Auth 配置失败: ${authRes.error.message || JSON.stringify(authRes)}`);
      console.log('   ℹ 请手动配置: https://supabase.com/dashboard/project/' + CONFIG.supabase.projectId + '/auth/url-configuration');
    } else {
      console.log(`   ✓ Auth 回调 URL 已配置`);
    }

    console.log('\n✅ 配置完成！\n');
    console.log('📋 接下来的步骤:\n');
    console.log('1. 等待 Vercel 重新部署 (2-3 分钟)');
    console.log('   查看: https://vercel.com/markhz/ohmyprofessors_web/deployments\n');
    console.log('2. 验证网站: https://ohmyprofessors.com\n');
    console.log('3. 执行数据库 Schema:');
    console.log(`   https://supabase.com/dashboard/project/${CONFIG.supabase.projectId}/sql/new`);
    console.log('   复制 docs/CTO_ARCHITECTURE.md 第 3 节 SQL 并执行\n');

  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    console.error('\n详细错误:', error);
  }

  rl.close();
}

main();
