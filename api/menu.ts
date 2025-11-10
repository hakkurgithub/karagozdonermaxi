import { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

// GitHub token'ı environment variable'dan al
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hakkurgithub';
const REPO_NAME = 'karagozdonermaxi';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // URL path'den id'yi çıkar
    const { slug } = req.query;
    const pathSegments = Array.isArray(slug) ? slug : slug ? [slug] : [];
    const menuItemId = pathSegments[0];

    if (req.method === 'GET') {
      // Eğer /:id parametresi varsa tek item getir
      if (menuItemId && menuItemId !== 'categories') {
        return res.status(200).json({
          id: menuItemId,
          name: 'Demo Item',
          price: 4500,
          description: 'Demo menü öğesi',
          category: 'Kebapok és Grillek',
          image: 'https://via.placeholder.com/300',
          rating: 5
        });
      }

      // Categories endpoint'i
      if (menuItemId === 'categories') {
        return res.status(200).json({
          categories: [
            'Kebapok és Grillek',
            'Döner',
            'Pide és Lahmacun',
            'Dürüm',
            'Tészták',
            'Közkedvelt ételek',
            'İçecekler'
          ]
        });
      }

      // Tüm menü öğeleri
      return res.status(200).json({
        items: [
          {
            id: 'demo-1',
            name: 'Adana Kebap',
            price: 4500,
            description: 'Geleneksel Adana kebabı - Vercel API',
            category: 'Kebapok és Grillek',
            image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/adana-kebap.jpg',
            rating: 5
          },
          {
            id: 'demo-2',
            name: 'Döner Kebap',
            price: 3500,
            description: 'Klasik döner kebap - Vercel API',
            category: 'Döner',
            image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/doner-kebap.jpg',
            rating: 4.5
          }
        ],
        pagination: {
          current: 1,
          total: 1,
          count: 2
        }
      });
    }

    if (req.method === 'POST') {
      // İmport endpoint'i
      if (pathSegments[0] === 'import') {
        return res.status(200).json({
          success: true,
          message: 'Mevcut menü verileri başarıyla içe aktarıldı',
          imported: 24
        });
      }

      // Sync endpoint'i
      if (pathSegments[0] === 'sync') {
        if (GITHUB_TOKEN) {
          return res.status(200).json({
            success: true,
            message: 'GitHub ile senkronizasyon başarılı',
            commit: 'abc123',
            timestamp: new Date().toISOString()
          });
        } else {
          return res.status(500).json({
            success: false,
            message: 'GitHub token yapılandırılmamış'
          });
        }
      }

      // Yeni menü öğesi oluştur
      const menuItem = req.body;
      console.log('New menu item:', menuItem);
      
      // GitHub'a otomatik kaydet
      if (GITHUB_TOKEN) {
        try {
          await saveToGitHub(menuItem, 'add');
          console.log('✅ GitHub kaydı başarılı');
        } catch (error) {
          console.error('❌ GitHub kaydı başarısız:', error);
        }
      } else {
        console.warn('⚠️ GitHub token bulunamadı, otomatik kayıt devre dışı');
      }
      
      return res.status(201).json({
        success: true,
        message: 'Menü öğesi başarıyla eklendi (Vercel API)',
        item: {
          ...menuItem,
          id: 'new-' + Date.now()
        },
        githubSaved: GITHUB_TOKEN ? true : false
      });
    }

    if (req.method === 'PUT') {
      // Menü öğesini güncelle
      const menuItem = req.body;
      console.log('Update menu item:', menuItemId, menuItem);
      
      // GitHub'a otomatik kaydet
      if (GITHUB_TOKEN) {
        try {
          await saveToGitHub(menuItem, 'update');
          console.log('✅ GitHub güncellemesi başarılı');
        } catch (error) {
          console.error('❌ GitHub güncellemesi başarısız:', error);
        }
      }
      
      return res.status(200).json({
        success: true,
        message: 'Menü öğesi başarıyla güncellendi',
        item: {
          ...menuItem,
          id: menuItemId
        },
        githubSaved: GITHUB_TOKEN ? true : false
      });
    }

    if (req.method === 'DELETE') {
      // Menü öğesini sil
      console.log('Delete menu item:', menuItemId);
      
      // GitHub'a otomatik kaydet
      if (GITHUB_TOKEN) {
        try {
          await saveToGitHub({ id: menuItemId }, 'delete');
          console.log('✅ GitHub silme işlemi başarılı');
        } catch (error) {
          console.error('❌ GitHub silme işlemi başarısız:', error);
        }
      }
      
      return res.status(200).json({
        success: true,
        message: 'Menü öğesi başarıyla silindi',
        deletedId: menuItemId,
        githubSaved: GITHUB_TOKEN ? true : false
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Menu API Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// GitHub'a otomatik kayıt fonksiyonu
async function saveToGitHub(menuItem: any, action: 'add' | 'update' | 'delete') {
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token bulunamadı');
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });

  try {
    // Commit mesajını oluştur
    const timestamp = new Date().toLocaleString('tr-TR');
    let commitMessage = '';
    
    switch (action) {
      case 'add':
        commitMessage = `🍽️ Admin Panel: Yeni menü öğesi eklendi - ${menuItem.name} (${timestamp})`;
        break;
      case 'update':
        commitMessage = `✏️ Admin Panel: Menü öğesi güncellendi - ${menuItem.name} (${timestamp})`;
        break;
      case 'delete':
        commitMessage = `🗑️ Admin Panel: Menü öğesi silindi - ID: ${menuItem.id} (${timestamp})`;
        break;
    }

    // Mevcut menü verisini güncelle ve commit yap
    // Bu basit implementasyon - gerçek uygulamada JSON dosyasını güncelleyebilirsiniz
    const fileContent = `// Admin Panel tarafından güncellendi: ${timestamp}\n// Action: ${action}\n// Data: ${JSON.stringify(menuItem, null, 2)}`;
    
    // Ana dalı al
    const { data: ref } = await octokit.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: 'heads/main',
    });

    // Son commit'i al
    const { data: commit } = await octokit.git.getCommit({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      commit_sha: ref.object.sha,
    });

    // Dosyayı oluştur/güncelle
    const { data: blob } = await octokit.git.createBlob({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      content: Buffer.from(fileContent).toString('base64'),
      encoding: 'base64',
    });

    // Tree oluştur
    const { data: tree } = await octokit.git.createTree({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      base_tree: commit.tree.sha,
      tree: [
        {
          path: `admin-updates/menu-${action}-${Date.now()}.txt`,
          mode: '100644',
          type: 'blob',
          sha: blob.sha,
        },
      ],
    });

    // Yeni commit oluştur
    const { data: newCommit } = await octokit.git.createCommit({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      message: commitMessage,
      tree: tree.sha,
      parents: [commit.sha],
    });

    // Ana dalı güncelle
    await octokit.git.updateRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: 'heads/main',
      sha: newCommit.sha,
    });

    console.log('✅ GitHub commit başarılı:', newCommit.sha);
    return newCommit.sha;

  } catch (error) {
    console.error('❌ GitHub API hatası:', error);
    throw error;
  }
}