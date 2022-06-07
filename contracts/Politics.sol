// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Politics {
    struct COUNTRY{
        string name;
        uint16 power;
        uint256 price;//in ether/wei
        bool on_sale;//flag if the country is on sale
        bool taken;//flag if the country is taken
        address payable president;  //fancy name for the owner
        uint256 country_id;
        bytes32 hash;
    }
    

    address payable public owner; //owner of the contract
    COUNTRY[] public Country; //list of countries
    uint256 public nonce; //actual unique id for country
    //mapping (address=>COUNTRY[]) ownership; //keeps track of ownerships

    //msg sender becomes the owner
    constructor(){
        owner = payable(msg.sender);
    }

    modifier restricted(){
        require(msg.sender==owner,"You are not allowed to use this function");
        _;
    }

    //function to create unique hash
    function uniqueHash(uint256 _id)internal view returns(bytes32){
        assert(Country[_id].hash == 0);
        return keccak256(abi.encodePacked(nonce, msg.sender, block.number));
    }

    //function to mint new country ready to be bought
    //Owner passes the name, price and power, rest is default
    function mintCountry(string memory _name, uint256 _price, uint16 _power)public restricted{
        COUNTRY memory rand;
        Country.push(rand);

        //set all values to default, or by parameters
        Country[nonce].name = _name;
        Country[nonce].on_sale = true;
        Country[nonce].taken = true;
        Country[nonce].price = _price;
        Country[nonce].power = _power;
        Country[nonce].president = (payable(address(this)));
        Country[nonce].hash  = uniqueHash(nonce);
        Country[nonce].country_id = nonce;
        //ownership[address(0)].push(Country[nonce]);
        //increment nonce so there will not be two identical ID's (helps to hash)
        nonce++;
    }

    //allow users to buy country
    function buyCountry(uint256 id) external payable{
        require(Country[id].on_sale==true, "This country is not on sale");
        require(msg.value>=Country[id].price,"Your resources are insufficient");
        
        //when president changes, by default the country will be not on sale
        Country[id].on_sale = false;

        //send ether to the seller
        if( Country[id].president != address(this)){
            Country[id].president.transfer(msg.value);
        }

        //set new president
        Country[id].president = payable(msg.sender);

        //After the change of the president, country is a little weaker
        if(Country[id].power>0)Country[id].power--; 
    }
    //allow the owner of country(president) to set new price
    function changePrice(uint256 id, uint256 _price)external{
        require(Country[id].president==msg.sender, "You have no permission to change any state of this country");
        Country[id].price =_price;
    }

    //allow the president to choose if they want to put on/off sale their country
    function putOnSaleOrOffSale(uint256 id)external{
        require(Country[id].president==msg.sender, "You have no permission to change any state of this country");
        if(!Country[id].on_sale){
            Country[id].on_sale =true;
        }
        else Country[id].on_sale =false;
    }
    //getters for countries
    function getPresident(uint256 id)view external returns(address){
        return Country[id].president;
    }
    function getName(uint256 id)view external returns(string memory){
        return Country[id].name;
    }
    function getPrice(uint256 id)view external returns(uint256){
        return Country[id].price;
    }
    function getPower(uint256 id)view external returns(uint256){
        return Country[id].power;
    }
    function getHash(uint256 id)view external returns(bytes32){
        return Country[id].hash;
    }
    function getOnSale(uint256 id)view external returns(bool){
        return Country[id].on_sale;
    }
    function getNonce()view external returns(uint256){
        return nonce;
    }
    function getId(uint256 id)view external returns(uint256){
        return Country[id].country_id;
    }
    //owner of the contract can get all the ether from contract (because after minting the country, the contract
    // gets the ethers so it gets the ether after first buy)
    function getStoredEther()external restricted{
        owner.transfer(address(this).balance);
    }
}