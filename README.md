## 필요

-   order
    -   product 필요
    -   coupon과 point를 사용했을 때의 최종 가격 책정
        -   유효한 coupon인지 확인도 여기서
    -   transaction 사용
-   point
    -   결제를 해야 쌓이는 것으로 구현 예정
    -   point에 대한 entity가 있어야 될 것 같음
    -   user entity에 point를 포함 시킬 예정
    -   point entity의 존재 의미
        -   지금까지 얼마나 쌓았었는지
        -   누적 사용량
        -   포인트 소멸 날짜

### 추가 하면 좋은 것들

-   log 작성
-   order detail
    -   주문내역 혹은 상태를 볼 수 있게 해야함
-   dash board(point, coupon)
    -   point가 얼마나 있는지 확인 가능해야함
    -   coupon의 기간이 얼마나 남았는지 확인 가능해야함
    -   coupon이 판매자의 요청에 의해 관리자가 발행하는 것이라면 판매자는 얼마나 남았는지 확인 가능해야함
-   cart(장바구니)
    -   현재 예시코드는 단일 상품에 대해서만 다루고 있음
