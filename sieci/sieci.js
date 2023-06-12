let SUBNET_MASK_MAP = new Map([
    [8, [255, 0, 0, 0]],
    [9, [255, 128, 0, 0]],
    [10, [255, 192, 0, 0]],
    [11, [255, 224, 0, 0]],
    [12, [255, 240, 0, 0]],
    [13, [255, 248, 0, 0]],
    [14, [255, 252, 0, 0]],
    [15, [255, 254, 0, 0]],
    [16, [255, 255, 0, 0]],
    [17, [255, 255, 128, 0]],
    [18, [255, 255, 192, 0]],
    [19, [255, 255, 224, 0]],
    [20, [255, 255, 240, 0]],
    [21, [255, 255, 248, 0]],
    [22, [255, 255, 252, 0]],
    [23, [255, 255, 254, 0]],
    [24, [255, 255, 255, 0]],
    [25, [255, 255, 255, 128]],
    [26, [255, 255, 255, 192]],
    [27, [255, 255, 255, 224]],
    [28, [255, 255, 255, 240]],
    [29, [255, 255, 255, 248]],
    [30, [255, 255, 255, 252]],
])
let ipAddress
let subnet0 = document.getElementById('subnet-0')
let subnet1 = document.getElementById('subnet-1')
let subnet2 = document.getElementById('subnet-2')
let subnet3 = document.getElementById('subnet-3')
let subnet4 = document.getElementById('subnet-4')
let calcButton = document.querySelector('.calc-button')
let ip0 = document.getElementById('ip-0');
let ip1 = document.getElementById('ip-1');
let ip2 = document.getElementById('ip-2');
let ip3 = document.getElementById('ip-3');
let paragraph = document.getElementById('result-paragraph')
calcButton.addEventListener('click', () => {
    const subnets = [Number(subnet0.value), Number(subnet1.value), Number(subnet2.value), Number(subnet3.value), Number(subnet4.value)]
    const ipAddress = [Number(ip0.value), Number(ip1.value), Number(ip2.value), Number(ip3.value)]
    paragraph.innerHTML = performSubnetting(ipAddress, subnets);
})
const addToIpAddress = (ipAddress, count) => {
    let newAddress = [...ipAddress]
    let numericIp = 0;
    for (let i = 0; i < 4; i++) {
        numericIp += ipAddress[i] * Math.pow(256, 3 - i);
    }

    numericIp += count;

    for (let i = 3; i >= 0; i--) {
        newAddress[i] = numericIp % 256
        numericIp = Math.floor(numericIp / 256);
    }
    return newAddress
}

const subtractFromIpAddress = (ipAddress, count) => {
    let newAddress = [...ipAddress]
    let numericIp = 0;
    for (let i = 0; i < 4; i++) {
        numericIp += ipAddress[i] * Math.pow(256, 3 - i);
    }

    numericIp -= count;

    for (let i = 3; i >= 0; i--) {
        newAddress[i] = numericIp % 256
        numericIp = Math.floor(numericIp / 256);
    }
    return newAddress
}

const calculateAllAddresses = (hosts) => {

    let allHosts = 0;
    let i = 1;
    while (allHosts < hosts + 2) {
        allHosts = 2 ** i
        i++
    }
    console.log(allHosts)
    return allHosts
}

const calculatePrefix = (hosts) => {
    return 32 - Math.log2(hosts)
}

const ipAddressArrayToString = (ipAddress) => {
    return ipAddress.join('.');
}
const performSubnetting = (ipAddress, subnetsToCalculate) => {
    let subnets = []
    let currentAddress = ipAddress
    let nextSubnet
    for (let i = 0; i < 5; i++) {
        const currentSubnetHosts = subnetsToCalculate[i];
        const countOfAllAddresses = calculateAllAddresses(currentSubnetHosts)
        const prefix = calculatePrefix(countOfAllAddresses)
        nextSubnet = addToIpAddress(currentAddress, countOfAllAddresses)
        subnets.push(
            {
                address: currentAddress,
                subnetMask: SUBNET_MASK_MAP.get(prefix),
                prefix: prefix,
                allHosts: countOfAllAddresses - 2,
                broadcast: subtractFromIpAddress(nextSubnet, 1),
                firstHost: addToIpAddress(currentAddress, 1),
                lastHost: subtractFromIpAddress(nextSubnet, 2),
            }
        )
        currentAddress = nextSubnet
    }
    let resultStr = []
    for (let i = 0; i < 5; i++) {
        const currentSubnet = subnets[i]
        resultStr.push(`
Posieć ${i}
Adres sieci: ${ipAddressArrayToString(currentSubnet.address)}
Maska (dziesiętnie): ${currentSubnet.subnetMask}
Prefiks: ${currentSubnet.prefix}
Adres rozgłoszeniowy: ${ipAddressArrayToString(currentSubnet.broadcast)}
Liczba adresów urządzeń: ${currentSubnet.allHosts}
Pierwszy adres hosta: ${ipAddressArrayToString(currentSubnet.firstHost)}
Ostatni adres hosta: ${ipAddressArrayToString(currentSubnet.lastHost)}
        `)
    }

    return resultStr
}


