const { EventHubProducerClient } = require("@azure/event-hubs");



const connectionString = "Endpoint=sb://inventory-hub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PUJyiOw89coBuCo0mZEg7W7sCgpNwhOT4wXTsgqLgE8=";
//EventHubClient  = require("@azure/event-hubs@2");
// Name of the event hub. For example: myeventhub
const eventHubName = "inventoryeventhub";

async function main() {
    EventHubProducerClient

    // Create a producer client to send messages to the event hub.
    // Create a producer client to send messages to the event hub.
    const producer = new EventHubProducerClient(connectionString, eventHubName);
    // Prepare a batch of three events.
    const batch = await producer.createBatch();
    batch.tryAdd({ body: "First event" });
    batch.tryAdd({ body: "Second event" });
    batch.tryAdd({ body: "Third event" });

    // Send the batch to the event hub.
    await producer.sendBatch(batch);

    // Close the producer client.
    await producer.close();

    console.log("A batch of three events have been sent to the event hub");
}

main().catch((err) => {
    console.log("Error occurred: ", err);
});