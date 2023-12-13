import sqlite3

def create_connection():
    connection = sqlite3.connect("students.db")
    return connection


# def drop_teach_table():
#     connection = create_connection()
#     cursor = connection.cursor()
#     cursor.execute("""
#         DROP TABLE IF EXISTS teach;
#     """)
#     connection.commit()
#     connection.close()

# drop_teach_table()

# def drop_student_table():
#     connection = create_connection()
#     cursor = connection.cursor()
#     cursor.execute("""
#         DROP TABLE IF EXISTS student;
#     """)
#     connection.commit()
#     connection.close()

# drop_student_table()

# def drop_class_table():
#     connection = create_connection()
#     cursor = connection.cursor()
#     cursor.execute("""
#         DROP TABLE IF EXISTS class;
#     """)
#     connection.commit()
#     connection.close()

# drop_class_table()

# def drop_enroll_table():
#     connection = create_connection()
#     cursor = connection.cursor()
#     cursor.execute("""
#         DROP TABLE IF EXISTS enrollment;
#     """)
#     connection.commit()
#     connection.close()

# drop_enroll_table()