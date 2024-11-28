document.addEventListener("DOMContentLoaded", function () {
    let introContainer = document.getElementById("intro-container");
    let introText = document.getElementById("intro-text");
    let startButton = document.getElementById("startButton");
    let cameraContainer = document.getElementById("camera-container");
    let message1 = document.getElementById('message1'); // 첫 번째 메세지
    let captureButton1 = document.getElementById("captureButton1");
    const message2 = document.getElementById('message2'); 
    let captureButton2 = document.getElementById("captureButton2");
    let captureScreen = document.getElementById("captureScreen");
    const loadingPopup = document.getElementById("loading-popup");
    let threejsContainer = document.getElementById("threejs-container");
    let video = document.getElementById("video");
    let sideMessage1= document.getElementById('side-message1');
    let sideMessage2= document.getElementById('side-message2');


    const messages = [
    { ko: "모든 이들은 여러개의 자아를 갖고 세상과 마주한다 .", en: "Everyone has multiple personas to face the world." },
    { ko: "수많은 상황과 관계 속에서 나타나는 나의 다양한 모습들....", en: "My various appearances emerge in countless situations and relationships...." },
    { ko: "오랜시간 축적된 기억과 경험은 파편화 되어 하나의 자아를 구성한다 .", en: "Accumulated memories and experiences over time fragment into a single persona." },
    { ko: "여러 자아가 전환되며 조화를 이루기도, 충돌하여 내면의 갈등을 만들기도", en: "Multiple personas may harmonize or clash, creating inner conflict." },
    { ko: "또는 타인의 자아와 맞닥뜨리기도 한다 .", en: "Or we may confront the personas of others." },
    { ko: "내 본연의 자아는 무엇일까", en: "What is my true persona?" },
    { ko: "우리가 가진 각 자아의 형태는 어떠한가", en: "What forms do our various personas take?" },
    { ko: "파편화 되어 나타나는 다양한 자아의 이면을 세분히 관찰해보자 .", en: "Let’s closely observe the facets of our fragmented personas." }
];
let messageIndex = 0;

// 화면을 클릭했을 때 멘트 순차적으로 나타나게 하기
document.body.addEventListener("click", () => {
     const bgMusic = document.getElementById("background-music")
     const introContainer = document.getElementById("intro-container");
     const introImg = document.getElementById("intro-img")
     const backmentBottom = document.getElementById("backment-bottom")

     introImg.style.filter = "blur(5px)"
     introImg.style.transition = "transform 2s ease";
     introImg.style.transform = "translate(-25vw,-5vh) scale(1.3)";

     
     const h1 = introContainer.querySelector('h1');
        h1.style.transition = "transform 2s ease, font-size 2s ease"; // font-size와 transform의 두 가지 애니메이션 적용
        h1.style.transform = "translateY(35vh)"; // h1 위치 조정
        h1.style.fontSize = "5vw"; // 글자 크기 변화
        h1.style.position = "absolute"; // 글자 크기 변화
        h1.style.textAlign = "right"
    // 배경을 그라디언트만 남기도록 설정
    introContainer.style.background = "linear-gradient(to bottom, #d6d6d6 10%, white 30%, #7BD7EB 90%)";
    if (messageIndex < messages.length) {
        introContainer.querySelector('p').style.display = "none";  // 썸네일 숨김 // 썸네일 숨김
        backmentBottom.style.transition = "color 2s ease";
        backmentBottom.style.color = "#FFD8C7"; 
        introText.style.display = "block";
        introText.textContent = messages[messageIndex].ko; // 한국어 메시지
        const englishText = document.createElement('div');
        englishText.textContent = messages[messageIndex].en; // 영어 메시지
        englishText.style.fontSize = "2.5vw";
        englishText.style.lineHeight = "2.5vw"; // 영어 메시지 스타일
        englishText.style.opacity = 0; // 초기 불투명도
        englishText.style.transition = "opacity 3s ease-out"; // 애니메이션 효과
        englishText.style.color = "#d6d6d6";
        englishText.style.zIndex = 10;
        englishText.style.textAlign = "center";
        introContainer.appendChild(englishText); // 영어 메시지 추가

        // 애니메이션을 위해 reset 후 부드럽게 나타나도록 설정
        introText.style.opacity = 0;
        introText.style.color = "#444";
        introText.style.transform = "translateY(20px)"; // 아래에서 위로 떠오르게 설정
        introText.style.transition = "none"; // 기존의 transition을 없애고


        // 약간의 지연 후 애니메이션 시작
        setTimeout(() => {
            introText.style.transition = "opacity 3s ease-out, transform 3s ease-out"; // 다시 transition 설정
            introText.style.opacity = 1;
            introText.style.transform = "translateY(0)";

            englishText.style.opacity = 1; // 영어 메시지를 부드럽게 나타나게 함
        }, 100); // 약간의 지연 후 애니메이션 시작

        messageIndex++;
    }
     if (bgMusic.paused) {
        setTimeout(() => {
            bgMusic.play();
        }, 1000); // 3초 딜레이
    }

    // 마지막 멘트 후 버튼 표시
    if (messageIndex === messages.length) {
        setTimeout(() => {
            startButton.style.display = "block";
            startButton.style.opacity = 0;
            startButton.style.transition = "opacity 1s";
            startButton.style.opacity = 1;
        }, 1700); // 멘트가 끝난 후 0.5초 뒤에 버튼 표시
    }
});


    // 시작하기 버튼 클릭 시 카메라 화면으로 전환
    startButton.addEventListener("click", () => {
        introContainer.style.opacity = 0;
        setTimeout(() => {
            introContainer.style.display = "none";
            cameraContainer.style.display = "flex";
        }, 500);
    });

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("카메라 접근 오류:", err);
        });

    captureButton1.addEventListener("click", () => {
        captureImage(1);
        message1.style.display = 'none';
        sideMessage1.style.display = "none";

        // 확인 및 스타일 변경
        if (sideMessage2 && message2) {
            sideMessage2.style.display = "block";
            message2.style.display = "block";
        }

        captureButton1.style.display = "none";
        captureButton2.style.display = "block";
        captureScreen.style.display = "flex";
    });
    captureButton2.addEventListener("click", () => {
    captureImage(2);

    // 로딩 팝업 표시
    loadingPopup.style.display = "block";
    loadingPopup.style.opacity = 1; // 애니메이션을 위한 opacity 설정

    captureScreen.style.display = "none";
    threejsContainer.style.display = "block"; // 3D 컨테이너를 표시

    // threejsContainer가 보이기 시작한 후 로딩 팝업을 숨깁니다.
    setTimeout(() => {
        loadingPopup.style.display = "none"; // 로딩 창 숨김
    }, 500); // 로딩 팝업이 나타난 후 0.5초 후에 사라지도록 설정
});
});



let img1, img2;
let pixelsData = [];
let scene, camera, renderer, controls;
let cubes = [];

async function captureImage(imgNumber) {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = canvas.toDataURL("image/png");
    img.onload = function () {
        if (imgNumber === 1) {
            img1 = img;
            captureButton1.disabled = true;
            captureButton1.innerText = "첫 번째 촬영 완료";
        } else if (imgNumber === 2) {
            img2 = img;
            captureButton2.disabled = true;
            captureButton2.innerText = "두 번째 촬영 완료";
            processImages();
        }
    };
}

async function processImages() {  // 자아 세분화 중 메시지

    if (!img1 || !img2) {
        console.error("두 이미지를 모두 캡처해야 합니다.");
        return;
    }


    const net = await bodyPix.load();
    const segmentation1 = await net.segmentPerson(img1);
    const segmentation2 = await net.segmentPerson(img2);

    let canvas1 = document.createElement("canvas");
    canvas1.width = img1.width;
    canvas1.height = img1.height;
    let ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(img1, 0, 0);

    let canvas2 = document.createElement("canvas");
    canvas2.width = img2.width;
    canvas2.height = img2.height;
    let ctx2 = canvas2.getContext("2d");
    ctx2.drawImage(img2, 0, 0);

    // 배경 제거
    removeBackground(ctx1, canvas1, segmentation1);
    removeBackground(ctx2, canvas2, segmentation2);

    pixelsData = [];
    let pixelSize = 3;
    let pixelSpacing = 30; 

    // 픽셀화 및 z 위치 계산
    for (let x = 0; x < img1.width; x += pixelSize) {
        for (let y = 0; y < img1.height; y += pixelSize) {
            let pixel1 = ctx1.getImageData(x, y, pixelSize, pixelSize).data;
            let pixel2 = ctx2.getImageData(x, y, pixelSize, pixelSize).data;

            let depth = map(pixel1[0], 0, 255, -100, 100);
            pixelsData.push({
                x: (x - img1.width / 2) * 1.5,  
                y: (-(y - img1.height / 2)) * 1.5, 
                z: depth,
                color1: new THREE.Color(`rgb(${pixel1[0]}, ${pixel1[1]}, ${pixel1[2]})`),
                color2: new THREE.Color(`rgb(${pixel2[0]}, ${pixel2[1]}, ${pixel2[2]})`)
            });
        }
    }

    initThreeJS();
}


function removeBackground(ctx, canvas, segmentation) {
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (segmentation.data[i / 4] === 0) {  
            data[i] = 255;  
            data[i + 1] = 255; 
            data[i + 2] = 255; 
            data[i + 3] = 0;  
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function initThreeJS() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); 
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);


    pixelsData.forEach(pixel => {
        let geometry = new THREE.BoxGeometry(5, 5, 5); 
        let material = new THREE.MeshBasicMaterial({ color: pixel.color1 });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(pixel.x, pixel.y, pixel.z);
        cubes.push({ mesh: cube, color1: pixel.color1, color2: pixel.color2 });
        scene.add(cube);
    });

    animate();


    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cubeObj => {
        let angle = Math.abs(camera.rotation.y) % Math.PI;
        cubeObj.mesh.material.color = angle > Math.PI / 2 ? cubeObj.color2 : cubeObj.color1;
    });

    controls.update();
    renderer.render(scene, camera);
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

