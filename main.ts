let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Yellow))
basic.forever(function () {
    control.waitMicros(400000)
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    control.waitMicros(400000)
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.Off)
})
