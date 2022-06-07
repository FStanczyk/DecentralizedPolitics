import { MockProvider } from '@ethereum-waffle/provider';
import { useCall } from '..';
import { expect } from 'chai';
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE, SECOND_TEST_CHAIN_ID, SECOND_MOCK_TOKEN_INITIAL_BALANCE, } from '../testing';
import { ChainId } from '../constants/chainId';
describe('useCall', () => {
    const mockProvider = new MockProvider();
    const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } });
    const [deployer] = mockProvider.getWallets();
    const [secondDeployer] = secondMockProvider.getWallets();
    let token;
    let secondToken;
    beforeEach(async () => {
        token = await deployMockToken(deployer);
        secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('initial test balance to be correct', async () => {
        var _a;
        const { result, waitForCurrent } = await renderWeb3Hook(() => useCall({
            contract: token,
            method: 'balanceOf',
            args: [deployer.address],
        }), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.value[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseCall(token, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE);
        await testMultiChainUseCall(secondToken, [secondDeployer.address], SECOND_TEST_CHAIN_ID, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    const testMultiChainUseCall = async (contract, args, chainId, endValue) => {
        var _a;
        const { result, waitForCurrent } = await renderWeb3Hook(() => useCall({
            contract,
            method: 'balanceOf',
            args,
        }, { chainId }), {
            mockProvider: {
                [ChainId.Localhost]: mockProvider,
                [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.value[0]).to.eq(endValue);
    };
});
//# sourceMappingURL=useCall.test.js.map