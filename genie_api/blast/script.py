import sys
import subprocess, shlex

print("Output from Python")
try: 
    database_file = sys.argv[1]
    print("Path to file: " + database_file) 
    sys.stdout.flush()

    # BUILD
    makedb = 'makeblastdb -in ' + database_file + ' -dbtype nucl -title db -out db'
    args = shlex.split(makedb)
    b = subprocess.Popen(args)
    b.wait()

    # SEARCH
    searchdb = 'blastn -query sample.fasta -db db -out blastn_out.html -html'
    args = shlex.split(searchdb)
    s = subprocess.Popen(args)
    s.communicate()
    print("SEARCH FINISHED")
    # add style.css to html results
    # # with is like your try .. finally block in this case
    # with open('blastn_out.html', 'r') as file:
    #     # read a list of lines into data
    #     data = file.readlines()

    # # now change the 2nd line, note that you have to add a newline
    # data[1] = 'Mage\n'

    # # and write everything back
    # with open('stats.txt', 'w') as file:
    #     file.writelines( data )


except:
    print("USAGE ERROR!")
    print("usage: python3 script.py <filepath>")


# subprocess.run(['ls','-l'])