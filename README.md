# 사용 라이브러리
```
"@gorhom/bottom-sheet": "^5.1.2",
"moment": "^2.30.1",
"react-native-gesture-handler": "^2.24.0",
"react-native-mmkv": "^2.2.0",
"react-native-reanimated": "^3.17.1",
"react-native-safe-area-context": "^5.3.0",
"react-native-subtitles": "^5.0.5",
"react-native-svg": "^15.11.2",
"react-native-video": "^6.11.0",
"zustand": "^5.0.3"
```
### react-native-video
- new architecture가 활성화된 ios에서 m3u 영상에 vtt 자막을 노출하려고 하면 영상이 재생되지 않는 이슈가 있어 new architecture를 비활성화
동시에 mmkv 버전도 v3 -> v2로 낮춤

### @gorhom/bottom-sheet
- 댓글 창 모달을 해당 라이브러리 사용해 노출
- 키보드 확장 시 ios 와 android의 TextInput의 position: "absolute"로 인한 레이아웃의 차이때문에 서로 다른 TextInput 컴포넌트를 사용
------

# 상태관리
zustand 사용하여 mmkv storage에 persist 적용하여 앱을 재실행 해도 변경된 값이 남아있도록 개발

-------
# 폴더 구조
```
src
├── assets
├── components
    ├── bottomSheet/
    ├── comment/
    ├── input/
    └── shorts/
├── constants
├── screens
    └── ShortsScreen.tsx
├── types
├── utils
└── zustand
```

