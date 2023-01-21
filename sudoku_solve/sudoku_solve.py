def write_completed_sudoku():
    global sudoku
    answer_file = open("answer.txt", 'w')
    for row in sudoku:
        for col in row:
            col = str(col)
            answer_file.write(col)
        answer_file.write("\n")


def check():
    global sudoku
    completed_number = 405  # 45 * 9 = 405
    s = 0

    for row in sudoku:
        for col in row:
            s = s + col

    # sudoku is fully completed
    if s == completed_number:
        write_completed_sudoku()
        exit()

    # sudoku is uncompleted because of insufficient information
    elif s < completed_number:
        write_completed_sudoku()
        answer_file = open("answer.txt", 'a')   # add commnet
        answer_file.write("No error but not enough information\n")


# applying cross-hatching technique and automatically complete sudoku
def solve():
    global sudoku, solved

    while True:
        plug_in_finished = True

        for num in range(1, 10):  # num is the number trying to plug in
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
                    num_of_candidate = 0  # counting the number of possible position
                    is_in_box = False  # True = identical number exists in box / False = not exist

                    for row_in_box in range(row_box, row_box + 3):
                        for col_in_box in range(col_box, col_box + 3):
                            cur = sudoku[row_in_box][col_in_box]

                            if cur == num:  # Find a same number
                                is_in_box = True

                            # double check whether it is the domain capable of number insertion or not
                            if (row_in_box in possible_row) and (col_in_box in possible_col):
                                if cur == 0:  # current area is blank
                                    num_of_candidate = num_of_candidate + 1
                                    row_candidate = row_in_box
                                    col_candidate = col_in_box

                    # If a particular number is already in the box, there's no need to search
                    if is_in_box: continue

                    # Find a place
                    if num_of_candidate == 1:
                        plug_in_finished = False
                        sudoku[row_candidate][col_candidate] = num  # insert the number
                        possible_row.remove(row_candidate)  # eliminate current position from possible position
                        possible_col.remove(col_candidate)  # eliminate current position from possible position
                        solved[num].append((row_candidate, col_candidate))  # update information

                    #  Error : unable to insert number
                    if num_of_candidate == 0:
                        answer_file = open("answer.txt", 'w')
                        answer_file.write("Error")  # write an error message
                        exit()

        if plug_in_finished is True:
            check()
            break


if __name__ == "__main__":
    sudoku_file_name = "sudoku.txt"             # name of a file
    sudoku_file = open(sudoku_file_name, 'r')   # opening a file
    sudoku = []  # array in which the numbers of Sudoku are to be saved

    # The index is a number, element is information of row and col
    # where the number is located are stored as a pair
    solved = [[] for _ in range(10)]

    while True:
        cur_line = sudoku_file.readline()  # read file line by line
        if not cur_line:  # until it reads null
            break
        temp_row = []
        for elem in cur_line[:9]:
            elem = int(elem)  # change the type of variable for mathematical calculation
            temp_row.append(elem)  # make a temporary list
        sudoku.append(temp_row)

    for row in range(9):
        for col in range(9):
            cur_number = sudoku[row][col]
            solved[cur_number].append((row, col))  # store the information of position

    solve()