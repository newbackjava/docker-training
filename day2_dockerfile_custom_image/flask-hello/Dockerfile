# 1) 경량 베이스 이미지
FROM python:3.11-slim

# 2) 런타임 필수 패키지 (보안/용량 고려해 최소로)
RUN pip install --no-cache-dir --upgrade pip

# 3) 작업 디렉터리
WORKDIR /app

# 4) 의존성 먼저 복사/설치 (레이어 캐시 최적화)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5) 앱 소스 복사
COPY app.py .

# 6) 서비스 포트
EXPOSE 5000

# 7) 컨테이너 시작 시 기본 실행 명령
CMD ["python", "app.py"]
