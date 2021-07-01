import Config from "../common/Config";
import Form from "../common/Form";
import Loading from "../common/Loading";
import Server from "../common/Server";
import Version from "../common/Version";
import Website from "../common/Website";
import app from "./Application";

const providers = [Form, Loading, Version, Server, Website, Config] as any;

app.providers(providers);

app.start();
