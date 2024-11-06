# 트러블슈팅 기록

## 1. 배열 정렬 시 원본 데이터가 함께 변경되는 문제

### 문제 상황

- TOP 20 영화 목록을 위해 평점순 정렬을 구현했는데, 다른 곳에서 사용하는 원본 영화 목록도 함께 정렬되는 현상 발생
- 발생 일시: 2024.11.06

### 원인

- JavaScript에서 배열은 참조 타입이므로 `sort()` 메서드 사용 시 원본 배열이 직접 변경됨
- 원본 데이터와 정렬된 데이터가 같은 배열을 참조하고 있어서 발생하는 문제
- 데이터의 원본을 직접 변경하는 것을 Mutation(변이)이라고 함

```jsx
// 문제가 있는 코드
const [movieList] = useState(data.results);
const [top20Movies] = useState(data.results.sort((a, b) => b.vote_average - a.vote_average).slice(0, 20));
```

### 해결 방법

- 배열을 복사한 후 정렬 작업을 수행하여 원본 데이터 보존
- 스프레드 연산자를 사용해서 새로운 배열 생성

```jsx
// 해결된 코드
const [movieList] = useState(data.results);
const [top20Movies] = useState(
  [...data.results] // 스프레드 연산자로 배열 복사
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 20)
);
```

### 학습 내용

1. JavaScript 참조 타입의 특성 (배열을 기준으로)

```jsx
// 참조 예시
const original = [1, 2, 3];
const reference = original; // 참조만 복사
const copy = [...original]; // 스프레드 연산자를 사용하여 실제 값을 복사

reference.sort(); // original도 함께 변경됨
copy.sort(); // original은 변경되지 않음
```

- sort(), push(), pop(), splice(), shift(), unshift(), reverse() 등은 원본 배열을 직접 수정함(Mutation 발생)
- map(), filter(), slice(), 스프레드 연산자(...) 등은 새로운 배열을 반환(Non-mutation, 불변성 유지)

2. 배열을 복사하는 방법

```jsx
// 방법 1: 스프레드 연산자 (추천)
const copy1 = [...originalArray];

// 방법 2: slice()
const copy2 = originalArray.slice();

// 방법 3: Array.from()
const copy3 = Array.from(originalArray);

// 방법 4: concat()
const copy4 = [].concat(originalArray);
```

3. React에서 상태 관리 시 주의사항

- 상태 업데이트 시 항상 불변성 유지가 중요
- 참조 타입 데이터 다룰 때 깊은 복사가 필요한 경우도 있음

### 참고 자료

- JavaScript Array Methods (MDN)
- React State and Lifecycle
