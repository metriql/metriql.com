# Python

You can run [MQL](/query/mql) queries on Metriql using Trino's Python package. 

### Installation

```bash
$ pip install trino
```

### Usage

```python
import trino

METRIQL_HOST = 'demo.metriql.com'
METRIQL_PORT = '443'
YOUR_METRIQL_USERNAME = 'python-myuser'
YOUR_METRIQL_PASSWORD = None

conn = trino.dbapi.connect(
    host=METRIQL_HOST,
    port=METRIQL_PORT,
    user=YOUR_METRIQL_USERNAME,
    catalog='metriql',
    schema='public',
    auth=trino.auth.BasicAuthentication(YOUR_METRIQL_USERNAME, YOUR_METRIQL_PASSWORD),
)
cur = conn.cursor()
all_datasets = cur.execute('SHOW TABLES').fetchall()
orders_dataset = cur.execute("""
    SHOW COLUMNS FROM "ref('orders')"
    """).fetchall()
total_orders = cur.execute("""
    SELECT total_orders FROM "ref('orders')"
    """).fetchall()
```