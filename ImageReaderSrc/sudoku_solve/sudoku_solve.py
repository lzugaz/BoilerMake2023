sudoku = []                         # array in which the numbers of Sudoku are to be saved
solved = [[] for _ in range(10)]    # index: number, element: position information of row and col pair(row, col)
empty_space = []


def initial_setting():  # reading file,
    global sudoku

    file = "/Users/jennychen/Desktop/project.nosync/boilerMake/ImageReaderSrc/sudoku_solve/sudoku.txt"
    sudoku_file = open(file, 'r')  # making a file

    while True:
        cur_line = sudoku_file.readline()   # read file line by line
        cur_line = cur_line.split(" ")
        cur_line = "".join(cur_line)
        if not cur_line:                    # until it reads null
            break
        temp_row = []
        for elem in cur_line[:9]:
            elem = int(elem)                # change the type of variable for mathematical calculation
            temp_row.append(elem)           # make a temporary list
        sudoku.append(temp_row)

    for row in range(9):
        for col in range(9):
            cur_number = sudoku[row][col]
            solved[cur_number].append((row, col))   # store the information of position


def first_check():
    global sudoku

    for row in range(9):
        for col in range(9):
            cur = sudoku[row][col]

            if cur == 0:  # zero can have multiple overlaps
                continue

            for idx in range(9):
                cmp_row = sudoku[row][idx]
                if (col != idx) and (cur == cmp_row):
                    return False
                cmp_col = sudoku[idx][col]
                if (row != idx) and (cur == cmp_col):
                    return False

            # exclude numbers in the same square
            for r in range(3):
                for c in range(3):
                    new_row = (row // 3) * 3 + r
                    new_col = (col // 3) * 3 + c
                    cmp_new_number = sudoku[new_row][new_col]
                    if (row == new_row) and (col == new_col):
                        continue
                    if cur == cmp_new_number:
                        return False

    return True


def write_completed_sudoku():
    global sudoku
    answer_file = open("/Users/jennychen/Desktop/project.nosync/boilerMake/sudoku/public/answer.txt", 'w')
    for row in sudoku:
        for col in row:
            col = str(col)
            answer_file.write(col + " ")
        answer_file.write("\n")


def check():
    global sudoku, cross_hatching_flag
    completed_number = 405     # 45 * 9 = 405
    s = 0

    for row in sudoku:
        for col in row:
            s = s + col

    # sudoku is fully completed
    if s == completed_number:
        write_completed_sudoku()
        exit()

    if s < completed_number:
        cross_hatching_flag = False


# applying cross-hatching technique and automatically complete sudoku
def cross_hatching():
    global sudoku, solved

    while True:
        plug_in_finished = True

        for num in range(1, 10):    # num is the number trying to plug in
            possible_row = [i for i in range(9)]
            possible_col = [i for i in range(9)]

            # process of removing the domain in which the number insertion is impossible
            # since the number is unable to come out twice in the line
            # in case a line includes the specific number (num) in one area
            for (row, col) in solved[num]:
                if row in possible_row:
                    possible_row.remove(row)
                if col in possible_col:
                    possible_col.remove(col)

            # The start of the box is the same for both row and column: 0, 3, 6th index
            box_number = [0, 3, 6]

            # exclude numbers in the same square
            for row_box in box_number:
                for col_box in box_number:
                    num_of_candidate = 0    # counting the number of possible position
                    is_in_box = False       # True = identical number exists in box / False = not exist

                    for row_in_box in range(row_box, row_box + 3):
                        for col_in_box in range(col_box, col_box + 3):
                            cur = sudoku[row_in_box][col_in_box]

                            if cur == num:  # Find a same number
                                is_in_box = True

                            # double check whether it is the domain capable of number insertion or not
                            if (row_in_box in possible_row) and (col_in_box in possible_col):
                                if cur == 0:    # current area is blank
                                    num_of_candidate = num_of_candidate + 1
                                    row_candidate = row_in_box
                                    col_candidate = col_in_box

                    # If a particular number is already in the box, there's no need to search
                    if is_in_box: continue

                    # Find a place
                    if num_of_candidate == 1:
                        plug_in_finished = False
                        sudoku[row_candidate][col_candidate] = num  # insert the number
                        possible_row.remove(row_candidate)          # eliminate current position from possible position
                        possible_col.remove(col_candidate)          # eliminate current position from possible position
                        solved[num].append((row_candidate, col_candidate))  # update information

                    #  Error : unable to insert number
                    if num_of_candidate == 0:
                        answer_file = open("answer.txt", 'w')
                        answer_file.write("Error")  # write an error message
                        exit()

        if plug_in_finished is True:
            check()
            break

    if cross_hatching_flag is True:
        return True
    return False


def backtracking(blank_idx):
    global  sudoku, empty_space

    if blank_idx == len(empty_space) :
        write_completed_sudoku()
        blank_idx = 0

    # key: number, value = bool
    candidate = {}
    for num in range(1, 10):
        candidate[num] = True

    cur_row, cur_col = empty_space[blank_idx]

    # exclude numbers in the same column and row
    for idx in range(9):
        row_check = sudoku[cur_row][idx]
        candidate[row_check] = False

        col_check = sudoku[idx][cur_col]
        candidate[col_check] = False

    # exclude numbers in the same square
    for r in range(3):
        for c in range(3):
            new_row = (cur_row // 3) * 3 + r
            new_col = (cur_col // 3) * 3 + c
            new_number = sudoku[new_row][new_col]
            candidate[new_number] = False

    # insert non-excluded numbers
    for integer in range(1, 10):
        if candidate[integer] is True:          # if it is possible to insert
            sudoku[cur_row][cur_col] = integer  # insert an integer
            backtracking(blank_idx + 1)

    # remove unpromising option by using backtracking algorithm
    sudoku[cur_row][cur_col] = 0

def fin():
    cross_hatching_flag = True
    initial_setting()

    valid = first_check()

    if not valid:
        answer_file = open("/Users/jennychen/Desktop/project.nosync/boilerMake/sudoku/public/answer.txt", 'w')
        answer_file.write("Invalid Sudoku!")
        exit()

    if not cross_hatching():

        for i in range(9):
            for j in range(9):
                if sudoku[i][j] == 0:
                    empty_space.append((i, j))

        backtracking(0)