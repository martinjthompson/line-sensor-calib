let brightness = 0
let minimumDistance = 0
let maximumDistance = 0
let distance = 0
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
moveMotorZIP.setBrightness(255)
moveMotorZIP.showColor(Kitronik_Move_Motor.rgb(0, 0, 0))
Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
basic.forever(function () {
    serial.writeNumber(distance)
    serial.writeString(",")
    serial.writeLine("")
    control.waitMicros(100000)
})
basic.forever(function () {
	
})
basic.forever(function () {
    maximumDistance = 25
    minimumDistance = 0
    distance = Kitronik_Move_Motor.measure()
    brightness = 255 - (distance - minimumDistance) / (maximumDistance - minimumDistance) * 255
    if (distance < maximumDistance) {
        moveMotorZIP.showColor(Kitronik_Move_Motor.rgb(brightness, 0, 0))
    } else {
        moveMotorZIP.showColor(Kitronik_Move_Motor.rgb(0, 0, 0))
    }
})
