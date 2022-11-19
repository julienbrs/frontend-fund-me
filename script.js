import { ethers } from "./ethers-5.1.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log(error);
        }

        connectButton.innerHTML = "Connected!!";
    } else {
        connectButton.innerHTML = "Please install Metamask";
    }
}

async function fund(ethAmount) {
    //ethAmount = "0.01";
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        // we need a provider, a signer, and a contract to interact with (so address + abi)
        const provider = new ethers.provider.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const transactionResponse = await contract.fund({
            value: ethers.utils.parseEther(ethAmount),
        });
    }
}
