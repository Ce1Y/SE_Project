package SE_Project.demo.model;

public enum Type {
    expense("expense"),
    income("income");
    private final String type;

    private Type(String s) {
        type = s;
    }

    @Override
    public String toString() {
        return this.type;
    }
}
