Notes on building a 8bit computer. The circuit is simulated with the great Logisim, I've also written a converter for my assembly language and a helper to write micro instructions.

![8bit](/8bit/8bit.gif)

- Addressing modes

Implicit
Absolute $nn
Immediate #$nn
Indexed $nn,a
Indexed indirect ($nn,a)
Indirect ($nn)
Indirect indexed ($nn),a

- Storage

lda #$nn
lda $nn
lda ($nn)
ldb #$nn
ldb $nn
ldb ($nn)
sta $nn
sta ($nn)
stb $nn
stb $nn,a
stb ($nn),a
stb ($nn,a)
tab transfer from AX to BX
tba transfer from BX to AX

- Math

adc #$nn AX = AX + $nn
adc $nn AX = AX + {$nn}
sbc #$nn AX = AX - $nn
sbc $nn AX = AX - {$nn}
inc AX = AX + 1
dec AX = AX - 1

- Bitwise

and #$nn AX = AX AND $nn
and $nn AX = AX AND {$nn}
ora #$nn AX = AX OR $nn
ora $nn AX = AX OR {$nn}
eor #$nn AX = AX XOR $nn
eor $nn AX = AX XOR {$nn}
lsl AX logical shift left
lsr AX logical shift right
asl AX arithmetic shift left
rol AX rotate left one bit
ror AX rotate right one bit

- Branch

bpl $nn branch on plus (N)
bmi $nn branch on minus (N)
bcc $nn branch on carry clear (C)
bcs $nn branch on carry set (C)
bne $nn branch on not equal (Z)
beq $nn branch on equal (Z)

- Flags

sec set carry flag
clc clear carry flag

- Registers

cmp #$nn compare $nn to AX
cmp $nn compare {$nn} to AX

- Stack

pha push AX on stack
pop pop stack top to AX

- Jump

jmp #$nn jump to location $nn
jmp $nn jump to location {$nn}
jsr $nn jump to location $nn and save return address
jsr {$nn} jump to location {$nn} and save return address
rts return from subroutine

- Input

cib clear input buffer