const GATEWAY = 'http://127.0.0.1:8081';
const APIENDPOINT = 'http://127.0.0.1:5001/';

const uploadButton = document.getElementById('uploadbutton');
const loadingButton = document.getElementById('loadingbutton');

var ipfs;

document.addEventListener('DOMContentLoaded', async () => {
  ipfs = await Ipfs.create({
    url: 'http://127.0.0.1:5001/api/v0',
  });
});

const uploadFileToIPFS = async (file, blobFileName) => {
  const results = await ipfs.add(file);
  const cid = results.path;

  const url = `http://127.0.0.1:8081/ipfs/${cid}`;
  appendLink(url, blobFileName);
};

uploadButton.addEventListener('click', () => {
  uploadButton.classList.add('hidden');
  loadingButton.classList.remove('hidden');

  for (const file in FILES) {
    uploadFileToIPFS(FILES[file], file);
  }

  setTimeout(() => {
    uploadButton.classList.remove('hidden');
    loadingButton.classList.add('hidden');
  }, 1000);
});

function appendLink(url, blobFileName) {
  const item = document.getElementById(`${blobFileName}`);

  item?.querySelector('#fileUrlButton')?.classList.remove('hidden');
  item?.querySelector('#imageUrlButton')?.classList.remove('hidden');

  item?.querySelector('a').setAttribute('href', url);
}

// http://127.0.0.1:8081/ipfs/QmUjzptKCuMVAA77HxAE9PP8AVCp1gy2sd79NMpCTeriVo
