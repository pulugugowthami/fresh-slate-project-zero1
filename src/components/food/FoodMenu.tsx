
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Utensils } from "lucide-react";
import { toast } from "sonner";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const FoodMenu: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [cart, setCart] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const { data, error } = await supabase.from('food_items').select('*');
      if (data) setFoodItems(data);
    };
    fetchFoodItems();
  }, []);

  const addToCart = (item: FoodItem) => {
    setCart([...cart, item]);
    toast.success(`Added ${item.name} to cart`, {
      description: `$${item.price.toFixed(2)}`
    });
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('food_orders')
        .insert({ total_amount: totalAmount, status: 'pending' })
        .select('id')
        .single();

      if (orderError) throw orderError;

      const orderItemsPromises = cart.map(item => 
        supabase.from('food_order_items').insert({
          order_id: orderData.id,
          food_item_id: item.id,
          quantity: 1,
          price: item.price
        })
      );

      await Promise.all(orderItemsPromises);

      toast.success("Order placed successfully!", {
        description: `Total: $${totalAmount.toFixed(2)}`
      });

      setCart([]);
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils /> Food Menu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodItems.map((item) => (
            <div 
              key={item.id} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button 
                    size="sm" 
                    onClick={() => addToCart(item)}
                    variant="outline"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-bold mb-2">Cart</h4>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>
                ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </span>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodMenu;
