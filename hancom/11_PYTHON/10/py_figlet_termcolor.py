# 1. pyfiglet, termcolor 불러오기
import pyfiglet
from termcolor import colored
# 2. pyfiglet 적용
figlet_text = "Z Z Z"
print(pyfiglet.figlet_format(figlet_text))

# 3. termcolor 적용
termcolor_text = "YYY"
colored_text = colored(
    termcolor_text,
    "magenta",
    "on_light_cyan"
)
print(colored(colored_text))

# 4. pyfiglet + termcolor 적용된 텍스트 출력

fig_term_text = pyfiglet.figlet_format(figlet_text)
fig_term_text_colored = colored(
    fig_term_text,
    "magenta",
    "on_light_cyan",
    ["bold"]
)

print(fig_term_text_colored)