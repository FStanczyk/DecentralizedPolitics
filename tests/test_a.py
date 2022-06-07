from brownie import Politics, accounts
from web3 import Web3
ether = 1000000000000000000

def test_simple_info():
    owner = accounts[0]
    account1 = accounts[1]

    contract = Politics.deploy({"from":owner}); 
    contract.mintCountry("Vanuatu", 0.003*ether, 11, {"from": owner, })
    contract.mintCountry("Mexico", 0.01*ether, 67, {"from": owner, })

    contract.buyCountry(1,{"from": account1, "value":0.01*ether})

    assert contract.getName(0,{"from": owner}) == "Vanuatu"
    assert contract.getPower(1,{"from": owner}) == 67-1

    assert contract.getPresident(1,{"from": owner}) == account1
    assert contract.getPrice(1,{"from": owner}) == 0.01*ether

def test_more_info():
    owner = accounts[0]
    account1 = accounts[1]
    account2 = accounts[2]

    contract = Politics.deploy({"from":owner}); 
    contract.mintCountry("Vanuatu", 0.003*ether, 11, {"from": owner, })
    contract.mintCountry("Mexico", 0.01*ether, 67, {"from": owner, })

    contract.buyCountry(1,{"from": account1, "value":0.01*ether})
    contract.putOnSaleOrOffSale(1,{"from": account1})

    contract.buyCountry(1,{"from": account2, "value":0.01*ether})
    contract.changePrice(1, 0.02*ether, {"from": account2})
    contract.putOnSaleOrOffSale(1,{"from": account2})

    assert contract.getPresident(1,{"from": owner}) == account2

    contract.buyCountry(1,{"from": account1, "value":0.02*ether})

    assert contract.getPresident(1,{"from": owner}) == account1
    assert contract.getPrice(1,{"from": owner}) == 0.02*ether