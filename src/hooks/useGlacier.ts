import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { useMemo } from 'react';

import Glacier from '@/service/Glacier';

const useGlacier = () => {
    const { walletProvider } = useWeb3ModalProvider();

    const glacier = useMemo(() => {
        if (walletProvider) return new Glacier(walletProvider);
    }, [walletProvider]);

    return { glacier };
};

export default useGlacier;
