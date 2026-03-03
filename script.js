// LocalStorage 键名
const STORAGE_KEY = 'mysteryBoxImages';
const DRAWN_KEY = 'mysteryBoxDrawn';

// DOM 元素
const homePage = document.getElementById('homePage');
const uploadPage = document.getElementById('uploadPage');
const drawPage = document.getElementById('drawPage');
const uploadBtn = document.getElementById('uploadBtn');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const imageGrid = document.getElementById('imageGrid');
const clearAllBtn = document.getElementById('clearAllBtn');
const completeUploadBtn = document.getElementById('completeUploadBtn');
const mysteryBox = document.getElementById('mysteryBox');
const boxLarge = document.getElementById('boxLarge');
const prizeDisplay = document.getElementById('prizeDisplay');
const prizeImage = document.getElementById('prizeImage');
const prizeNumber = document.getElementById('prizeNumber');
const closePrizeBtn = document.getElementById('closePrizeBtn');
const imageCount = document.getElementById('imageCount');
const drawnCount = document.getElementById('drawnCount');
const remainingCount = document.getElementById('remainingCount');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    updateStats();
});

// 创建粒子背景
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 页面切换
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    page.classList.add('active');
}

// 上传按钮
uploadBtn.addEventListener('click', () => {
    switchPage(uploadPage);
    renderImageList();
});

// 返回按钮
backBtn.addEventListener('click', () => {
    switchPage(homePage);
    updateStats();
});

// 开始抽奖按钮
startBtn.addEventListener('click', () => {
    const images = getImages();
    const drawn = getDrawnImages();

    if (images.length === 0) {
        showToast('请先上传图片！', 'error');
        return;
    }

    if (drawn.length >= images.length) {
        // 所有图片都已抽取，重置
        if (confirm('所有图片都已抽取完毕，是否重新开始？')) {
            resetDrawn();
            startDraw();
        }
    } else {
        startDraw();
    }
});

// 上传区域点击
uploadBox.addEventListener('click', () => {
    fileInput.click();
});

// 文件选择
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    uploadImages(files);
});

// 拖拽上传
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#7c3aed';
    uploadBox.style.background = 'rgba(124, 58, 237, 0.1)';
});

uploadBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '';
    uploadBox.style.background = '';
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '';
    uploadBox.style.background = '';

    const files = e.dataTransfer.files;
    uploadImages(files);
});

// 上传图片
async function uploadImages(files) {
    const validFiles = Array.from(files).filter(file => {
        return file.type.startsWith('image/');
    });

    if (validFiles.length === 0) {
        showToast('请选择有效的图片文件！', 'error');
        return;
    }

    let uploadedCount = 0;
    let errorCount = 0;

    for (const file of validFiles) {
        try {
            const base64 = await fileToBase64(file);
            saveImage(base64, file.name);
            uploadedCount++;
        } catch (error) {
            console.error('上传失败:', error);
            errorCount++;
        }
    }

    if (uploadedCount > 0) {
        showToast(`成功上传 ${uploadedCount} 张图片！`, 'success');
        renderImageList();
    }

    if (errorCount > 0) {
        showToast(`${errorCount} 张图片上传失败！`, 'error');
    }

    fileInput.value = '';
}

// 文件转 Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 保存图片到 LocalStorage
function saveImage(base64, name) {
    const images = getImages();
    const image = {
        id: Date.now() + Math.random(),
        name: name,
        data: base64,
        uploadTime: new Date().toISOString()
    };
    images.push(image);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (error) {
        console.error('保存失败:', error);
        showToast('存储空间不足，无法保存图片！', 'error');
        // 尝试保存更小的图片
        compressAndSaveImage(base64, name, images);
    }
}

// 压缩并保存图片
function compressAndSaveImage(base64, name, images) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 缩小图片
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // 降低质量
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        const image = {
            id: Date.now() + Math.random(),
            name: name,
            data: compressedBase64,
            uploadTime: new Date().toISOString()
        };

        images.push(image);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
        } catch (error) {
            console.error('压缩后仍无法保存:', error);
            showToast('图片太大，无法保存！', 'error');
        }
    };
    img.src = base64;
}

// 获取所有图片
function getImages() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// 渲染图片列表
function renderImageList() {
    const images = getImages();
    imageGrid.innerHTML = '';

    if (images.length === 0) {
        imageGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a78bfa;">还没有上传任何图片</p>';
        return;
    }

    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${image.data}" alt="${image.name}">
            <button class="delete-btn" data-id="${image.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // 删除按钮
        const deleteBtn = imageItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteImage(image.id);
        });

        imageGrid.appendChild(imageItem);
    });
}

// 删除图片
function deleteImage(id) {
    if (!confirm('确定要删除这张图片吗？')) {
        return;
    }

    let images = getImages();
    images = images.filter(img => img.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    renderImageList();
    showToast('图片已删除！', 'info');
}

// 清空所有图片
clearAllBtn.addEventListener('click', () => {
    if (!confirm('确定要清空所有图片吗？此操作不可恢复！')) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DRAWN_KEY);
    renderImageList();
    showToast('所有图片已清空！', 'info');
});

// 完成上传
completeUploadBtn.addEventListener('click', () => {
    switchPage(homePage);
    updateStats();
    showToast('上传完成！', 'success');
});

// 更新统计信息
function updateStats() {
    const images = getImages();
    const drawn = getDrawnImages();

    imageCount.textContent = images.length;
    drawnCount.textContent = drawn.length;
    remainingCount.textContent = Math.max(0, images.length - drawn.length);
}

// 获取已抽取的图片
function getDrawnImages() {
    const data = localStorage.getItem(DRAWN_KEY);
    return data ? JSON.parse(data) : [];
}

// 保存已抽取的图片
function saveDrawnImage(id) {
    const drawn = getDrawnImages();
    drawn.push(id);
    localStorage.setItem(DRAWN_KEY, JSON.stringify(drawn));
}

// 重置已抽取的图片
function resetDrawn() {
    localStorage.removeItem(DRAWN_KEY);
    updateStats();
}

// 开始抽奖
function startDraw() {
    switchPage(drawPage);
    prizeDisplay.classList.remove('active');

    // 开始盒子动画
    setTimeout(() => {
        boxLarge.classList.add('box-opening');

        // 动画完成后显示奖品
        setTimeout(() => {
            showPrize();
        }, 2000);
    }, 500);
}

// 显示奖品
function showPrize() {
    const images = getImages();
    const drawn = getDrawnImages();

    // 获取未抽取的图片
    const availableImages = images.filter(img => !drawn.includes(img.id));

    if (availableImages.length === 0) {
        showToast('所有图片都已抽取完毕！', 'info');
        switchPage(homePage);
        return;
    }

    // 随机抽取
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const prize = availableImages[randomIndex];

    // 保存已抽取
    saveDrawnImage(prize.id);

    // 显示奖品
    prizeImage.src = prize.data;
    prizeNumber.textContent = `第 ${drawn.length + 1} 张`;

    prizeDisplay.classList.add('active');
    updateStats();
}

// 关闭奖品
closePrizeBtn.addEventListener('click', () => {
    switchPage(homePage);
    prizeDisplay.classList.remove('active');
    boxLarge.classList.remove('box-opening');
});

// Toast 提示
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 监听存储变化（其他标签页上传图片时同步）
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY || e.key === DRAWN_KEY) {
        updateStats();
        if (uploadPage.classList.contains('active')) {
            renderImageList();
        }
    }
});

// 盒子点击动画
mysteryBox.addEventListener('click', () => {
    mysteryBox.style.animation = 'none';
    mysteryBox.offsetHeight; // 触发重绘
    mysteryBox.style.animation = 'boxFloat 3s ease-in-out infinite';
});
