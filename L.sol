/**
 *Submitted for verification at testnet.bscscan.com on 2024-12-22
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

pragma solidity ^0.8.20;

contract ByForexInv {
    address private owner;
    uint256 private dividendAddrBal;
    IERC20 public usdttoken;
    uint256 private defaultRefer;
    address private feeReceiver;
    uint256 private constant maxLayers = 24;
    uint256 private constant distTime = 24 hours;
    uint256 private constant directRequired = 3;
    uint256[12] private levels = [
        20e18,
        40e18,
        80e18,
        160e18,
        320e18,
        640e18,
        1280e18,
        2560e18,
        5120e18,
        10240e18,
        20480e18,
        40960e18
    ];
    uint256[12] private dividendPools = [0, 0, 0, 0];

    struct User {
        address account;
        uint256 id;
        uint256 referrer;
        uint256 upline;
        uint256 start;
        uint256 level;
        uint256 directTeam;
        uint256 directTeamVolume;
        uint256 totalMatrixTeam;
        uint256 totalIncome;
        uint256 totalDeposit;
        uint256 referralIncome;
        uint256 levelIncome;
        uint256[12] income;
        uint256[4] dividendIncome;
    }

    struct Income {
        uint256 id;
        uint256 layer;
        uint256 amount;
        uint256 time;
    }

    struct Activity {
        uint256 id;
        uint256 level;
    }

    uint256 public startTime;
    uint256 public totalUsers;
    uint256[] public globalUsers;
    mapping(uint256 => uint256[]) public dividendUsers;
    uint256 public dividendLastDist;
    mapping(uint256 => User) public userInfo;
    mapping(uint256 => Income[]) public incomeInfo;
    Activity[] public activity;
    mapping(uint256 => mapping(uint256 => uint256[])) public teams;
    mapping(uint256 => uint256[]) public directTeam;
    mapping(uint256 => uint256) public matrixDirect;
    mapping(address => uint256) public id;

    constructor(address _tokenAddress) {
        defaultRefer = 1000;
        feeReceiver = msg.sender;
        owner = msg.sender;
        dividendLastDist = block.timestamp;
        startTime = block.timestamp;
        usdttoken = IERC20(_tokenAddress);
    }

    receive() external payable {}

    function register(
        uint256 _ref,
        address _newAcc,
        uint256 amt
    ) external {
        bool isSuper;
        if (msg.sender == owner) isSuper = true;
        require(id[_newAcc] == 0, "Already Registered");
        require(
            userInfo[_ref].start > 0 || _ref == defaultRefer,
            "Invalid Referrer"
        );

        uint256 newId = defaultRefer + (totalUsers + 1);
        id[_newAcc] = newId;
        User storage user = userInfo[newId];
        user.id = newId;

        uint256 _inAmt = levels[0];
        if (!isSuper) require(amt == _inAmt, "invalid amount value");

        payDivPools(_inAmt);

        user.referrer = _ref;
        user.account = _newAcc;

        if (user.referrer != defaultRefer) {
            userInfo[user.referrer].directTeam += 1;
            userInfo[user.referrer].directTeamVolume += levels[0];
            directTeam[user.referrer].push(user.id);
        }

        globalUsers.push(user.id);
        if (totalUsers > 0 && user.referrer != defaultRefer)
            _placeInMatrix(user.id, user.referrer);
        user.start = block.timestamp;
        totalUsers += 1;

        user.level += 1;
        user.totalDeposit += levels[0];

        if (!isSuper) {
            IERC20(usdttoken).transferFrom(msg.sender, address(this), ((_inAmt*20)/100));
        }

        _distUpgrading(newId, 1);
        activity.push(Activity(user.id, user.level));
    }

    function payDivPools(uint256 amt) internal {
        uint256 fee = (5 * amt) / 100;
        dividendPools[0] += fee;
        dividendPools[1] += fee;
        dividendPools[2] += fee;
        dividendPools[3] += fee;
        dividendAddrBal += (fee * 4);
    }

    function upgrade(
        uint256 _id,
        uint256 _lvls,
        uint256 amt
    ) external {
        bool isSuper;
        if (msg.sender == owner) isSuper = true;
        User storage user = userInfo[_id];
        require(user.referrer != 0, "Register First");
        require(_lvls > 0, "Must be +1 Level");
        require(user.level < levels.length, "Already at max level");
        require(user.level + _lvls <= levels.length, "Maximum Level");

        uint256 initialLvl = user.level;
        uint256 totalAmount = 0;

        for (uint256 i = initialLvl; i < initialLvl + _lvls; i++) {
            totalAmount += levels[i];
        }

        uint256 amount = totalAmount;
        if (!isSuper) require(amt == amount, "Invalid amount Value");

        if (!isSuper) {
            IERC20(usdttoken).transferFrom(msg.sender, address(this), ((amount*20)/100));
        }

        payDivPools(amount); //-20%
        userInfo[user.referrer].directTeamVolume += amount; //check if have ref

        uint256 dt = user.directTeam;
        uint256 dtv = user.directTeamVolume;

        for (uint256 i = initialLvl+1; i < initialLvl + _lvls; i++) {
            if (user.level > 1 && !isSuper) _distUpgrading(_id, i);
            user.level += 1;

            if (dt >= 2 && dtv >= 500e18) {
                dividendUsers[user.level].push(_id);
            }
            if (dt >= 4 && dtv >= 1000e18) {
                dividendUsers[user.level].push(_id);
            }
            if (dt >= 8 && dtv >= 2000e18) {
                dividendUsers[user.level].push(_id);
            }
            if (dt >= 16 && dtv >= 4000e18) {
                dividendUsers[user.level].push(_id);
            }
        }
        user.totalDeposit += totalAmount;
        activity.push(Activity(user.id, user.level));
    }

    function addIdToPool(uint256 id, uint256 pool) external {
        require(msg.sender == owner, "Not Authorized");
        dividendUsers[pool].push(id);
    }

    function _distUpgrading(uint256 _user, uint256 _level) private {
        uint256 upline = userInfo[_user].upline;
        //uint256 directSponsor = userInfo[_user].referrer;
        uint256 userAmtUpgrade = levels[_level-1];
        uint256 uplineFee = (userAmtUpgrade * 80) / 100;
        bool isSuper = msg.sender == owner;
        bool hasUpg = false;
        for (uint256 i = 0; i < maxLayers; i++) {
            if (i < _level - 1) {
                upline = userInfo[upline].upline;
            } else {
                if (upline == 0 || upline == defaultRefer) break;
                if (i < _level) {
                    upline = userInfo[upline].upline;
                } else {
                    if (userInfo[upline].level > _level) {
                        if (!isSuper)
                            IERC20(usdttoken).transferFrom(
                                msg.sender,
                                userInfo[upline].account,
                                uplineFee
                            );
                        userInfo[upline].totalIncome += uplineFee;
                        userInfo[upline].levelIncome += uplineFee;
                        userInfo[upline].income[_level] += uplineFee;
                        incomeInfo[upline].push(
                            Income(
                                _user,
                                i + 1,
                                uplineFee,
                                block.timestamp
                            )
                        );
                        hasUpg = true;
                        break;
                    }
                    upline = userInfo[upline].upline;
                }
            }
        }
        if (!hasUpg) {
            if (!isSuper) getAdminFees(uplineFee);
        }
    }

    function _placeInMatrix(uint256 _user, uint256 _ref) private {
        bool isFound;
        uint256 upline;

        if (matrixDirect[_ref] < 2) {
            userInfo[_user].upline = _ref;
            matrixDirect[_ref] += 1;
            upline = _ref;
        } else {
            for (uint256 i = 0; i < maxLayers; i++) {
                if (isFound) break;
                if (teams[_ref][i + 1].length < 2**(i + 2)) {
                    for (uint256 j = 0; j < teams[_ref][i].length; j++) {
                        if (isFound) break;
                        uint256 temp = teams[_ref][i][j];
                        if (matrixDirect[temp] < 2) {
                            userInfo[_user].upline = temp;
                            matrixDirect[temp] += 1;
                            upline = temp;
                            isFound = true;
                        }
                    }
                }
            }
        }

        for (uint256 i = 0; i < maxLayers; i++) {
            if (upline == 0 || upline == defaultRefer) break;
            userInfo[upline].totalMatrixTeam += 1;
            teams[upline][i].push(_user);
            upline = userInfo[upline].upline;
        }
    }

    function distributeDividend() external {
        require(
            block.timestamp - dividendLastDist >= distTime,
            "Timestep not completed"
        );

        for (uint256 i = 0; i < dividendPools.length; i++) {
            uint256[] memory players = dividendUsers[i];
            if (players.length > 0) {
                uint256 toDist = players.length > 0
                    ? dividendPools[i] / players.length
                    : 0;
                for (uint256 j = 0; j < players.length; j++) {
                    IERC20(usdttoken).transfer(
                        userInfo[players[j]].account,
                        toDist
                    );
                    userInfo[players[j]].totalIncome += toDist;
                    uint256[4] memory dli = userInfo[players[j]].dividendIncome;
                    dli[i] += toDist;
                    userInfo[players[j]].dividendIncome = dli;
                    incomeInfo[players[j]].push(
                        Income(17534, 0, toDist, block.timestamp)
                    );
                }
            } else {
                getAdminFees(dividendPools[i]);
            }
            dividendAddrBal -= dividendPools[i];
            dividendPools[i] = 0;
        }
        dividendLastDist = block.timestamp;
    }

    function getMatrixUsers(uint256 _user, uint256 _layer)
        external
        view
        returns (User[] memory)
    {
        User[] memory users = new User[](teams[_user][_layer].length);

        for (uint256 i = 0; i < teams[_user][_layer].length; i++) {
            users[i] = userInfo[teams[_user][_layer][i]];
        }

        return users;
    }

    function getIncome(uint256 _user) external view returns (Income[] memory) {
        return incomeInfo[_user];
    }

    function getMatrixDirect(uint256 _user)
        external
        view
        returns (uint256[2] memory _directs)
    {
        for (uint256 i = 0; i < teams[_user][0].length; i++) {
            _directs[i] = teams[_user][0][i];
        }
    }

    function getDirectTeamUsers(uint256 _user)
        external
        view
        returns (User[] memory)
    {
        User[] memory users = new User[](directTeam[_user].length);

        for (uint256 i = 0; i < directTeam[_user].length; i++) {
            users[i] = userInfo[directTeam[_user][i]];
        }

        return users;
    }

    function getLevels() external view returns (uint256[12] memory) {
        return (levels);
    }

    function getAdminFees(uint256 _fee) internal {
        IERC20(usdttoken).transferFrom(msg.sender,address(feeReceiver), _fee);
    }

    function getDividendTime() external view returns (uint256) {
        return dividendLastDist + distTime;
    }

    function getRecentActivities(uint256 _num)
        external
        view
        returns (Activity[] memory)
    {
        Activity[] memory _activity = new Activity[](
            activity.length > _num ? _num : activity.length
        );

        if (activity.length > _num) {
            uint256 taken = 0;
            for (uint256 i = activity.length; i > activity.length - _num; i--) {
                _activity[taken] = activity[i - 1];
                taken += 1;
            }
        } else {
            _activity = activity;
        }

        return _activity;
    }

    function getLevelIncome(uint256 _id)
        external
        view
        returns (uint256[12] memory)
    {
        return userInfo[_id].income;
    }

    function getDividendIncome(uint256 _id)
        external
        view
        returns (uint256[4] memory)
    {
        return userInfo[_id].dividendIncome;
    }

    function getDividendPool() external view returns (uint256[12] memory) {
        return dividendPools;
    }

    function transferOwnershipToZeroAddress() external {
        require(msg.sender == owner, "Not Authorized");
        owner = address(0);
    }

    function transferOwnership(address _a) external {
        require(msg.sender == owner, "Not Authorized");
        owner = address(_a);
    }
}