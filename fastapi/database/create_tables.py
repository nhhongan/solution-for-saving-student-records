import sqlite3

def create_connection():
    connection = sqlite3.connect("students.db")
    return connection

def create_student_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS student (
        sid VARCHAR PRIMARY KEY,
        sname TEXT NOT NULL,
        scholarship_id INTEGER,
        major_name TEXT NOT NULL,
        FOREIGN KEY(scholarship_id) REFERENCES scholarship(scholarship_id)
    )
    """)
    connection.commit()
    connection.close()

create_student_table()

def create_user_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password VARCHAR NOT NULL,
        sid VARCHAR,
        FOREIGN KEY(sid) REFERENCES student(sid)
    )
    """)
    connection.commit()
    connection.close()

create_user_table()

def create_major_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS major (
        major_id VARCHAR PRIMARY KEY,
        major_name TEXT NOT NULL
    )
    """)
    connection.commit()
    connection.close()

create_major_table()

def create_course_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS course (
        cid VARCHAR PRIMARY KEY,
        cname TEXT NOT NULL,
        major_id VARCHAR NOT NULL,
        credit INTEGER NOT NULL,
        fee INTEGER NOT NULL,
        FOREIGN KEY(major_id) REFERENCES major(major_id)
    )
    """)
    connection.commit()
    connection.close()

create_course_table()

def create_professor_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS professor (
        pid VARCHAR PRIMARY KEY,
        pname TEXT NOT NULL,
        department TEXT NOT NULL
    )
    """)
    connection.commit()
    connection.close()

create_professor_table()

def create_class_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS class (
        class_id INTEGER,
        cid VARCHAR,
        cname TEXT NOT NULL,
        day DATETIME NOT NULL,
        room TEXT NOT NULL,
        professor_name TEXT NOT NULL,
        FOREIGN KEY(cid) REFERENCES course(cid),
        FOREIGN KEY(cname) REFERENCES course(cname),
        FOREIGN KEY(professor_name) REFERENCES professor(pname),
        PRIMARY KEY(class_id, day, room)
    )
    """)
    connection.commit()
    connection.close()

create_class_table()


def create_teach_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS teach (
        class_id INTEGER,
        cid VARCHAR,
        cname TEXT NOT NULL,
        day DATETIME NOT NULL,
        room TEXT NOT NULL,
        pid VARCHAR NOT NULL,
        professor_name TEXT NOT NULL,
        FOREIGN KEY(cid) REFERENCES course(cid),
        FOREIGN KEY(cname) REFERENCES course(cname),
        FOREIGN KEY(professor_name) REFERENCES professor(pname),
        FOREIGN KEY(day) REFERENCES class(day),
        FOREIGN KEY(room) REFERENCES class(room),
        FOREIGN KEY(class_id) REFERENCES class(class_id),
        PRIMARY KEY(pid, class_id)
    )
    """)
    connection.commit()
    connection.close()

create_teach_table()

def create_enrollment_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS enrollment (
        sid VARCHAR,
        cid VARCHAR,
        inclass INTEGER NOT NULL,
        midterm INTEGER NOT NULL,
        final INTEGER NOT NULL,
        gpa INTEGER NOT NULL,
        PRIMARY KEY(sid, cid),
        FOREIGN KEY(sid) REFERENCES student(sid),
        FOREIGN KEY(cid) REFERENCES course(cid)
    )
    """)
    connection.commit()
    connection.close()

create_enrollment_table()

def create_scholarship_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scholarship (
        scholarship_id INTEGER PRIMARY KEY,
        description TEXT NOT NULL,
        percentage_discount FLOAT NOT NULL
    )
    """)
    connection.commit()
    connection.close()

create_scholarship_table()






