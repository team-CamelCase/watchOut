# API

## 전체 뉴스 조회
`GET /api/v1/news`

### 응답
```
[
    {
        "_id": "5ee35ab67e64b14bf6f37211",
        "title": "sorry stellar4",
        "content": "안녕하세요 세계",
        "region": "korea",
        "type": "info",
        "createdTime": 1591958198077,
        "fileName": "5ee35ab67e64b14bf6f37211-korea-info.wav"
    }
]
```

## 최신 뉴스 조회
`GET /api/v1/news/latest`

### 파라미터
* `number [optinal] # number of news` <array> 

### 응답
```
[
    {
        "_id": "5ee35ab67e64b14bf6f37211",
        "title": "sorry stellar4",
        "content": "안녕하세요 세계",
        "region": "korea",
        "type": "info",
        "createdTime": 1591958198077,
        "fileName": "5ee35ab67e64b14bf6f37211-korea-info.wav"
    },
    {
        "_id": "5ee35b986d617a4c66834d3f",
        "title": "Sejin cheerup",
        "content": "세진아 힘내자!!! 화이팅허자!!!!",
        "region": "korea",
        "type": "info",
        "createdTime": 1591958424542,
        "fileName": "5ee35b986d617a4c66834d3f-korea-info.wav"
    }
]
```

## ACCESS 토큰
`GET /api/v1/token`

### 응답
```
{
    "access_token": "this is access token",
    "refresh_token": "refresh blah blahblahb",
    "token_type": "Bearer",
    "expires_in": 3600,
    "expiration": 1591970705,
    "scope": "ibm openid"
}
```

