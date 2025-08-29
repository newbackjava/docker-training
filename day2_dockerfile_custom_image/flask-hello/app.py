from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    # "첫페이지"를 수정해서 띄우는 핵심 예제
    return "<body bgcolor='lightgreen'><h1>Hello, Flask in Docker2!</h1><p>이 페이지는 수정되었습니다.</p></body>"

if __name__ == "__main__":
    # 컨테이너 외부에서 접근 가능하도록 0.0.0.0
    app.run(host="0.0.0.0", port=5000)
