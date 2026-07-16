# 아스키 아트로 텍스트 디자인을 꾸며주는 플러그인
import pyfiglet

sentence = "Hello"
print(sentence)
#Hello 그냥 출력

sentence = pyfiglet.figlet_format("Hello")
print(sentence)
#  _   _      _ _       
# | | | | ___| | | ___  
# | |_| |/ _ \ | |/ _ \ 
# |  _  |  __/ | | (_) |
# |_| |_|\___|_|_|\___/  출력