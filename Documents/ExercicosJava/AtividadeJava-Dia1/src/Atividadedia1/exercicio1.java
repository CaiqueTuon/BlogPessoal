package Atividadedia1;

import java.util.Scanner;

public class exercicio1 {

	public static void main(String[] args) {
			
		Scanner ler = new Scanner(System.in);
		int idade,meses,dias,diastotal;
		
		System.out.println("Entre com a sua idade: ");
		idade = ler.nextInt();
		
		System.out.println("Entre com o mes do seu aniversario até o mes atual: ");
		meses = ler.nextInt();
		
		System.out.println("Entre com o dia do mes");
		dias = ler.nextInt();
		
		diastotal = (idade*365) + (meses*30) + dias;
		
		System.out.println(diastotal );
		
		
		
	}

}
