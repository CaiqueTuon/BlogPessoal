package Atividadedia1;

import java.util.Scanner;

public class exercico4 {

	public static void main(String[] args) {
		Scanner ler = new Scanner(System.in);
		int A,B,C;
		double R,S,D;
		
		System.out.println("Entre com um numero inteiro : ");
		A = ler.nextInt();
		System.out.println("Entre com um numero inteiro : ");
		B = ler.nextInt();
		System.out.println("Entre com um numero inteiro : ");
		C = ler.nextInt();
		
		R = Math.pow((A+B), 2);
		
		S = Math.pow((B+C), 2);
		
		D = (R+S)/2;
		
		System.out.print("O Resultado foi de: ");
		System.out.print(D);
		
		
		
	}

}
