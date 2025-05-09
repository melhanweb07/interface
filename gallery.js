// Sample images for the gallery (with names)
let galleryImages = [
    { src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', name: 'Annual Seminar' },
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', name: 'Campus Life' },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', name: 'Cultural Fest' },
    { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', name: 'Tech Talk' },
    { src: 'https://images.unsplash.com/photo-1461800919507-79bc5a6a16fd?auto=format&fit=crop&w=800&q=80', name: 'Science Lab' },
    { src: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80', name: 'Library' },
    { src: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80', name: 'Student Group' },
    { src: 'https://images.unsplash.com/photo-1462887749044-b44d2a003c31?auto=format&fit=crop&w=800&q=80', name: 'Art Workshop' },
    { src: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=800&q=80', name: 'Sports Day' },
    { src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80', name: 'Music Night' },
    { src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', name: 'Seminar' },
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', name: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', name: 'Festival' },
    { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', name: 'Workshop' }
];

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const photoCount = document.getElementById('photoCount');
    photoCount.textContent = `${galleryImages.length} Photographs`;
    galleryGrid.innerHTML = '';
    galleryImages.forEach(imgObj => {
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = imgObj.src;
        img.className = 'gallery-image';
        img.alt = imgObj.name || 'College Event Photo';
        img.onclick = () => showImageModal(imgObj.src);
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = imgObj.name || '';
        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        galleryGrid.appendChild(wrapper);
    });
}

document.addEventListener('DOMContentLoaded', renderGallery);

// Login Modal Functions
function showLoginPanel() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('uploadSection').style.display = 'none';
}
function closeLoginPanel() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginPassword').value = '';
    document.getElementById('uploadMessage').textContent = '';
}
function login() {
    const password = document.getElementById('loginPassword').value;
    if (password === 'adminai') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('uploadSection').style.display = 'block';
    } else {
        alert('Incorrect password!');
    }
}

// Upload Image to Gallery
function uploadImageToGallery() {
    const fileInput = document.getElementById('uploadImage');
    const nameInput = document.getElementById('imageName');
    const uploadMessage = document.getElementById('uploadMessage');
    const file = fileInput.files[0];
    const name = nameInput.value.trim();
    if (!file) {
        uploadMessage.textContent = 'Please select an image file.';
        uploadMessage.style.color = 'red';
        return;
    }
    if (!name) {
        uploadMessage.textContent = 'Please enter an image name.';
        uploadMessage.style.color = 'red';
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        galleryImages.unshift({ src: e.target.result, name });
        renderGallery();
        uploadMessage.textContent = 'Image uploaded successfully!';
        uploadMessage.style.color = 'green';
        fileInput.value = '';
        nameInput.value = '';
    };
    reader.readAsDataURL(file);
}

// Image Modal Functions
function showImageModal(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('imageModal').style.display = 'block';
}
function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Close modals on outside click
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const imageModal = document.getElementById('imageModal');
    if (event.target === loginModal) loginModal.style.display = 'none';
    if (event.target === imageModal) imageModal.style.display = 'none';
}; 