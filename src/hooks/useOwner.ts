import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useMemo } from 'react';

const useOwner = () => {
    const { address } = useWeb3ModalAccount();

    const isOwner = useMemo(
        () => address != undefined && address == process.env.NEXT_PUBLIC_OWNER_ADDRESS,
        [address]
    );

    return { isOwner, address };
};

export default useOwner;
