// 캐시 제목, 캐시 파일 선언
const sCacheName = 'accuniq';
const aFilesToCache = [
    './', './index.html', './manifest.json', './login.html',
    './img/logoA.png', './img/logoA(1).png', './img/logoA(2).png', './img/centerimage.jpg', './img/qr.png', '.img/accuniq_logo02.png'
];

// 서비스 워커 설치하고 캐시 파일 저장
self.addEventListener('install', pEvent => {
    console.log('서비스 워커 설치함!');
    pEvent.waitUntil(
        caches.open(sCacheName)
        .then(pCache => {
            console.log('파일을 캐시에 저장함!');
            return pCache.addAll(aFilesToCache);
        })
    );
});

// 고유 번호 할당받은 서비스 워커 작동
self.addEventListener('activate', pEvent => {
    console.log('서비스 워커 동작 시작됨!');
});

// 데이터 요청을 받으면 네트워크 또는 캐시에서 찾아 반환
self.addEventListener('fetch', pEvent =>{
    pEvent.respondWith(
        caches.match(pEvent.request)
        .then(response => {
            if(!response){
                console.log("네트워크에서 데이터 요청!", pEvent.request)
                return fetch(pEvent.request);
            }
            console.log("캐시에서 데이터 요청!", pEvent.request)
            return response;
        }).catch(err => console.log(err))
    );
});