import sys, os, json, shutil
sys.stdout.reconfigure(encoding='utf-8')
import openpyxl

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
files = os.listdir(script_dir)
xlsx_file = [f for f in files if f.endswith('.xlsx')][0]
full_path = os.path.join(script_dir, xlsx_file)

wb = openpyxl.load_workbook(full_path)
ws = wb.active

cases = []
current_category = ''
uid = 1

for i, row in enumerate(ws.iter_rows(values_only=True)):
    cols = (list(row) + [None]*4)[:4]
    col_a, col_b, col_c, col_d = cols

    # skip header row
    if i == 0:
        continue

    # skip fully empty rows
    if all(v is None for v in cols):
        continue

    # category row: col_a is a string (not a number), col_b and col_c are None
    # (merged cells A:C with category name land in col_a)
    if isinstance(col_a, str) and col_b is None and col_c is None:
        current_category = col_a.strip()
        continue

    # project row: col_a is a number, col_b is the title
    if isinstance(col_b, str) and col_b.strip():
        project_num = int(col_a) if isinstance(col_a, (int, float)) else ''
        description = col_c.strip() if isinstance(col_c, str) else ''
        cases.append({
            'id': uid,
            'category': current_category,
            'project_number': project_num,
            'title': col_b.strip(),
            'description': description
        })
        uid += 1

out_path = os.path.join(script_dir, 'cases.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(cases, f, ensure_ascii=False, indent=2)

web_data_dir = os.path.join(project_root, 'src', 'web', 'data')
os.makedirs(web_data_dir, exist_ok=True)
web_out_path = os.path.join(web_data_dir, 'cases.json')
shutil.copy2(out_path, web_out_path)

cats = list(dict.fromkeys(c['category'] for c in cases))
print(f'Done! {len(cases)} cases written:')
print(f'  - {out_path}')
print(f'  - {web_out_path}')
print(f'Categories ({len(cats)}): {cats}')
