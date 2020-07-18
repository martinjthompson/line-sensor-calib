input.onButtonPressed(Button.A, function () {
    if (motorOn == 1) {
        motorOn = 0
    } else {
        motorOn = 1
    }
})
function drive (left: boolean, right: boolean) {
    if (motorOn == 1) {
        if (left && right) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        } else if (left) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        } else if (right) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
        } else {
            Kitronik_Move_Motor.stop()
        }
    } else {
        Kitronik_Move_Motor.stop()
    }
}
let brightness = 0
let minimumDistance = 0
let maximumDistance = 0
let difference = 0
let right = 0
let left = 0
let distance = 0
let motorOn = 0
let speed = 0
speed = 25
motorOn = 0
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let t1 = input.runningTime()
basic.showLeds(`
    . . # . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
moveMotorZIP.setBrightness(255)
moveMotorZIP.show()
Kitronik_Move_Motor.stop()
basic.forever(function () {
    if (true) {
        moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Purple))
        moveMotorZIP.show()
        if (input.runningTime() - t1 > 100) {
            t1 = input.runningTime()
            serial.writeNumber(distance)
            serial.writeString(",")
            serial.writeNumber(left)
            serial.writeString(",")
            serial.writeNumber(right)
            serial.writeString(",")
            serial.writeNumber(difference)
            serial.writeString(",")
            serial.writeLine("")
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Black))
            moveMotorZIP.show()
        }
    }
})
basic.forever(function () {
    if (true) {
        left = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left) - 15
        right = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        difference = Math.abs(left - right)
        if (difference > 20) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Black))
            moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Black))
            if (left > right) {
                moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
                drive(true, false)
            } else {
                moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
                drive(false, true)
            }
        } else {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            drive(true, true)
        }
        moveMotorZIP.show()
    }
})
basic.forever(function () {
    if (false) {
        maximumDistance = 25
        minimumDistance = 0
        distance = Kitronik_Move_Motor.measure()
        brightness = 255 - (distance - minimumDistance) / (maximumDistance - minimumDistance) * 255
        if (distance < maximumDistance) {
            moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.rgb(brightness, 0, 0))
        } else {
            moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.rgb(0, 0, 0))
        }
    }
})
