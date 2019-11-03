import os

dir_path = "/Users/wonder/Documents/GitHub/WonderGame/Aircraft War/img/Explosion"
file_names = os.listdir(dir_path)
print(file_names)

n = 0
for file in file_names:
    print(file)
    file_parts = file.split('.')
    print(file_parts[0])
    if file_parts[1] == 'tiff':
        new_name = file_parts[0] + '.png'
        print('new_name', new_name)
        os.chdir(dir_path)
        os.rename(file, new_name)


# file_list = [os.path.join("./data/",file) for file in file_names]
# print(file_list)

