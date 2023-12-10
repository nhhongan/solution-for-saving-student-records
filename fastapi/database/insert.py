import sqlite3

def create_connection():
    connection = sqlite3.connect("students.db")
    return connection


def insert_student_data():
    connection = create_connection()
    cursor = connection.cursor()
    student_data = [
        ('John Doe', 25, 'Male'),
        ('Jane Smith', 22, 'Female'),
        ('Bob Johnson', 28, 'Male')
    ]
    cursor.executemany("""
        INSERT INTO students (name, age, gender)
        VALUES (?, ?, ?);
    """, student_data)

    connection.commit()
    connection.close()


insert_student_data()