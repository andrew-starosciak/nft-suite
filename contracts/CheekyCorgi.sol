//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { Context } from "@openzeppelin/contracts/utils/Context.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControlEnumerable } from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CheekyCorgi is
  Context,
  AccessControlEnumerable,
  ERC721,
  ERC721Enumerable,
  Ownable
{
  using Counters for Counters.Counter;
  using SafeMath for uint256;

  address public constant DEAD =
    address(0x000000000000000000000000000000000000dEaD);
  /**
    Supply Values.
   */
  uint256 public constant MAX_SUPPLY = 100;
  uint256 public constant PRIVATE_SALE = 8;
  uint256 public constant MAX_QUANTITY = 10;
  uint256 public constant LAUNCH_PRICE = 0.05 ether;
  uint256 public constant PRIVATE_SALE_PRICE = 0.03 ether;
  uint256 public constant PUBLIC_SALE_OPEN = 1635698960693; // Oct 31
  bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");

  // Provence Hash Overview (https://medium.com/coinmonks/the-elegance-of-the-nft-provenance-hash-solution-823b39f99473)
  string public PROVENANCE_HASH = "";

  address public ADMIN;
  address payable public TREASURY;
  mapping(uint256 => uint256) public birthTimes;
  mapping(uint256 => string) public bio;

  Counters.Counter private _tokenIds;
  string public baseTokenUri;

  /**
    Array with all token ids and is used for enumerating.
   */
  uint256[] private _allTokens;

  /**
    Maps a token index to base URI.
   */
  mapping(uint256 => string) private _tokenURIs;

  /**
    Maps from owner to list of owned token IDs
   */
  mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

  /**
    Maps from token id to position in the allTokens array
   */
  mapping(uint256 => uint256) private _allTokensIndex;

  /**
    Token Name
    */
  mapping(uint256 => string) private _tokenName;

  mapping(string => bool) private _nameReserved;

  mapping(address => bool) private _privateSaleWhitelist;

  constructor(
    string memory name,
    string memory symbol,
    string memory _baseTokenURI,
    address admin,
    address payable treasury,
    address owner
  ) ERC721(name, symbol) {
    baseTokenUri = _baseTokenURI;
    ADMIN = admin;
    TREASURY = treasury;
    transferOwnership(owner);
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    grantRole(DEFAULT_ADMIN_ROLE, ADMIN);
    _setupRole(TREASURY_ROLE, TREASURY);
  }

  // ERC721 Introspection Override.
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControlEnumerable, ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  // -------------------- EVENTS --------------------
  /**
    Event Emitter of Minted Token.
   */
  event Minted(address indexed minter, uint256 indexed tokenId);

  function mint(uint256 _quantity) public payable {
    require(
      totalSupply().add(_quantity) <= MAX_SUPPLY,
      "CheekyCorgi: Quantity must be lesser than MAX_SUPPLY = 100"
    );

    require(_quantity > 0, "CheekyCorgi: Quantity must be greater then zero");

    require(
      getPrice(_quantity) == msg.value,
      "CheekyCorgi: ETH Value incorrect (Quantity * LAUNCH_PRICE)"
    );

    for (uint256 i = 0; i < _quantity; i++) {
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();
      _mint(_msgSender(), newItemId);
      emit Minted(_msgSender(), newItemId);
    }
  }

  // -------------------- CALCULATION FUNCTIONS --------------------
  function getPrice(uint256 _quantity) public pure returns (uint256) {
    return _quantity * LAUNCH_PRICE;
  }

  // -------------------- MODIFIERS --------------------
  /**
    Check for Admin Role.
   */
  modifier onlyAdmin() {
    require(
      hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
      "CheekyCorgi: OnlyAdmin"
    );
    _;
  }

  /**
    Check Treasury Role.
   */
  modifier onlyTreasury() {
    require(hasRole(TREASURY_ROLE, _msgSender()), "CheekyCorgi: OnlyTreasury");
    _;
  }

  // -------------------- INTERNAL FUNCTIONS --------------------
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
}
