from flask import Flask
import mysql.connector

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Flask!"

@app.route('/posts')
def posts():
    conn = mysql.connector.connect(host='db', user='root', password='pass', database='test')
    cursor = conn.cursor()
    cursor.execute("SHOW DATABASES")
    results = cursor.fetchall()
    return str(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)