import sqlite3

def create_connection():
    connection = sqlite3.connect("students.db")
    return connection


def drop_teach_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        DROP TABLE IF EXISTS teach;
    """)
    connection.commit()
    connection.close()

drop_teach_table()