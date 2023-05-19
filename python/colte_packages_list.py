#!/usr/bin/python3
import psycopg2

conn = psycopg2.connect(database = "haulage_db",
        user = "haulage_db",
        host = "localhost",
        password = "haulage_db",
        port = 5432)

cur = conn.cursor()
cur.execute('SELECT * FROM packages;')
rows = cur.fetchall()
len_cur = len(rows)
print("{\n")
print("   \"packages\" :[ ")
for row in rows:
    if row[0] < len_cur:
        print("      {")
        print("         \"print_bytes\": \""+row[2]+"\",")
        print("         \"print_cost\": \""+row[3]+"\",")
        print("         \"currency_symbol\": \"$\",")
        print("         \"bytes\": \""+str(row[4])+"\",")
        print("         \"cost\": \""+row[3]+"\"")
        print("      },")
    else:
        print("      {")
        print("         \"print_bytes\": \""+row[2]+"\",")
        print("         \"print_cost\": \""+row[3]+"\",")
        print("         \"currency_symbol\": \"$\",")
        print("         \"bytes\": \""+str(row[4])+"\",")
        print("         \"cost\": \""+row[3]+"\"")
        print("      }")

print("  ]\n}")
conn.close()
