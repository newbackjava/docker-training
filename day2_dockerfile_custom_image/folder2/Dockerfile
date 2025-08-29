FROM httpd:2.4

# 문서 루트로 작업 디렉터리 설정
WORKDIR /usr/local/apache2/htdocs

# index.html 복사 (마지막 / 붙이는 습관 권장)
COPY index.html  /usr/local/apache2/htdocs/

# 같은 디렉터리에서 사본 생성
RUN cp index.html index2.html

