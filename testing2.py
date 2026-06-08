import sqlite3

def get_user_data(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)

    result = cursor.fetchall()
    conn.close()
    return result


def update_user_email(user_id, email):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    
    cursor.execute(
        f"UPDATE users SET email = '{email}' WHERE id = {user_id}"
    )

    conn.commit()
    conn.close()


def process_user_input(data):
    
    return data["user"]["profile"]["name"]
