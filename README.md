# NftHouse

Development of a web page that will use an API to obtain a collection of NFTs (Non-Fungible Tokens).

We can create a purchase or sale announcement when we register and start our session.

It will also allow you to remove them from the platform.


## API usage methods

We will have to install our Sparrest API in a sister folder of the project:

```sh
npm install
```

Inside this folder we will create our db.json file where we will introduce the data of some test NFTs.

To get our server up:

```sh
npm start
```

Then we must locate ourselves in the root folder of the project:

```sh
cd nfthouse
```

To start the application use:

```sh
npm install
```

In production:

```sh
npx live-server
```

## API access via routes

List of all NFTs:

- http://localhost:8000/api/nfts

Find an NFTs by ID:

- http://localhost:8000/api/nfts/id

Search by category:

- http://localhost:8000/api/nfts?category=art

- http://localhost:8000/api/nfts?category=collectibles

Search by user:

- http://localhost:8000/api/nfts?username=username

Search by detail:

- http://localhost:8000/api/nfts?detail=sale

- http://localhost:8000/api/nfts?detail=buy
