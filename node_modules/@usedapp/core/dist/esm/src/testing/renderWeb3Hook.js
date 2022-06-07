import { jsx as _jsx } from "react/jsx-runtime";
import { MockProvider } from '@ethereum-waffle/provider';
import { renderHook } from '@testing-library/react-hooks';
import { BlockNumberProvider, NetworkProvider, MultiChainStateProvider } from '../providers';
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils';
import { BlockNumbersProvider } from '../providers/blockNumber/blockNumbers';
import { ReadonlyNetworksProvider } from '../providers/network';
/**
 * A utility function for testing React hooks in useDApp ecosystem.
 *
 * It wraps a `renderHook` from `@testing-library/react-hooks`,
 * adding functionality related to:
 * - initializing web3 providers,
 * - auto-deploying multicall,
 * - adding helpers such as `mineBlock`,
 * - adding necessary useDApp context providers.
 *
 * @public
 * @param hook Hook under test
 * @param options Optional options, same as in `renderHook`
 * @returns Same as in `renderHook`, with additions of helper functions.
 */
export const renderWeb3Hook = async (hook, options) => {
    var _a, _b, _c;
    const providers = {};
    const multicallAddresses = {};
    let defaultProvider = new MockProvider();
    const addSingleProvider = async (currentProvider) => {
        var _a, _b;
        const { chainId } = await currentProvider.getNetwork();
        currentProvider.pollingInterval = (_b = (_a = options === null || options === void 0 ? void 0 : options.mockProviderOptions) === null || _a === void 0 ? void 0 : _a.pollingInterval) !== null && _b !== void 0 ? _b : 200;
        providers[chainId] = currentProvider;
        const mockMulticallAddresses = await deployMulticall(currentProvider, chainId);
        multicallAddresses[chainId] = mockMulticallAddresses[chainId];
        // In some occasions the block number lags behind.
        // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
        // and it results in a failed call. So we force the provider to catch up on the block number here.
        await currentProvider.getBlockNumber();
    };
    const providerObject = (options === null || options === void 0 ? void 0 : options.mockProvider) || new MockProvider();
    if (providerObject instanceof MockProvider) {
        defaultProvider = providerObject;
        await addSingleProvider(providerObject);
    }
    else {
        for (const chainIdString in providerObject) {
            const chainId = Number(chainIdString);
            await addSingleProvider(providerObject[chainId]);
        }
    }
    const UserWrapper = (_b = (_a = options === null || options === void 0 ? void 0 : options.renderHook) === null || _a === void 0 ? void 0 : _a.wrapper) !== null && _b !== void 0 ? _b : IdentityWrapper;
    const { result, waitForNextUpdate, rerender, unmount } = renderHook(hook, {
        wrapper: (wrapperProps) => (_jsx(NetworkProvider, Object.assign({ providerOverride: defaultProvider }, { children: _jsx(ReadonlyNetworksProvider, Object.assign({ providerOverrides: providers }, { children: _jsx(BlockNumberProvider, { children: _jsx(BlockNumbersProvider, { children: _jsx(MultiChainStateProvider, Object.assign({ multicallAddresses: multicallAddresses }, { children: _jsx(UserWrapper, Object.assign({}, wrapperProps)) })) }) }) })) }))),
        initialProps: (_c = options === null || options === void 0 ? void 0 : options.renderHook) === null || _c === void 0 ? void 0 : _c.initialProps,
    });
    return Object.assign({ result,
        defaultProvider, mineBlock: async () => mineBlock(defaultProvider), rerender,
        unmount,
        // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
        waitForNextUpdate }, getWaitUtils(result));
};
//# sourceMappingURL=renderWeb3Hook.js.map