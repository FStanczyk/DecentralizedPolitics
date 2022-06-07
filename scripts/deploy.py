from brownie import accounts, Politics,config, network
from web3 import Web3
import time
import yaml, json, os, shutil
ether = 1000000000000000000
def getAccount():
    if (network.show_active() == "development"):
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])

def deploy(front_end_update=False):
    account = getAccount() 
    #deploy the contract 
    dep = Politics.deploy({"from":account}, publish_source=True) 
    #get info
    def getInfo(id):
        print("Name:     ",dep.getName(id,{"from":account}))
        print("President ",dep.getPresident(id,{"from":account}))
        print("Price     ",dep.getPrice(id,{"from":account}))
        print("Power     ",dep.getPower(id,{"from":account}))
        print("Hash      ",dep.getHash(id,{"from":account}))
        print(" ")
    #mint first countries
    dep.mintCountry("Togo", 0.02*ether, 12, {"from": account})
    time.sleep(10)
    dep.mintCountry("Albania", 0.02*ether, 45, {"from": account})
    time.sleep(10)
    dep.mintCountry("Canada", 0.1*ether, 84, {"from": account})
    time.sleep(10)
    dep.mintCountry("Brazil", 70000000000000000, 61, {"from": account})
    time.sleep(10)
    dep.mintCountry("Czech Republic", 0.04*ether, 52, {"from": account})
    time.sleep(10)

    #getInfo(0)
    #getInfo(1)
    if front_end_update:
       update_front_end()

def mintCountry(name,price,power, front_end_update=False):
    Politics[-1].mintCountry(name, price, power, {"from": getAccount()})
    time.sleep(10)
    if front_end_update:
       update_front_end()

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src,dest)

def buyCountry(id, front_end_update=False):
    Politics[-1].buyCountry(id, {"from": getAccount(), "value": 0.07*ether })



def update_front_end(): #sends brownie.config to the src web_app folder
    with open("brownie-config.yaml","r")as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./web_app/src/brownie-config.json","w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    copy_folders_to_front_end("./build", "./web_app/src/chain-info")


def main():
    mintCountry("Belgium", 670000000000000000, 85, front_end_update=True )